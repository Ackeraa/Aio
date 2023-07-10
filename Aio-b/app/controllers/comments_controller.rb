class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :update, :destroy, :vote_up, :vote_down]
  before_action :authenticate_user!, only: [:create, :vote_up, :vote_down]
  before_action :set_page, only: [:search]

  # GET /comments
  def index
    @comments = Comment.hash_tree(limit_depth: 5)
    render json: comments_tree_for(@comments)
  end

  # GET /comments/search
  def search
    query = params[:query]
    which = params[:addition]
    total = Comment.where('which=? and creator ilike(?)', which, "%#{query}%").count
    @comments = Comment.where('which=? and creator ilike(?)',  which, "%#{query}%")
                       .limit(10).offset(@page * 10).hash_tree(limit_depth: 5)
    render json: { total: total, comments: comments_tree_for(@comments) }
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    which = params[:which]
    description = params[:description]
    if params[:parent_id].to_i > 0
      parent = Comment.find_by_id(params[:parent_id])
      @comment = parent.children.build(
        which: which,
        creator: current_user.name,
        description: description
      )
    else
      @comment = Comment.new(
        which: which,
        creator: current_user.name,
        description: description
      )
    end

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # POST /comments/vote_up
  def vote_up
    unless @comment.likes['voters'].include?(current_user.id)
      @comment.likes['votes'] += 1
      @comment.likes['voters'] << current_user.id
      if @comment.dislikes['voters'].include?(current_user.id)
        @comment.dislikes['votes'] -= 1
        @comment.dislikes['voters'].delete(current_user.id)
      end
    end
    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # POST /comments/vote_down
  def vote_down
    unless @comment.dislikes['voters'].include?(current_user.id)
      @comment.dislikes['votes'] += 1
      @comment.dislikes['voters'] << current_user.id
      if @comment.likes['voters'].include?(current_user.id)
        @comment.likes['votes'] -= 1
        @comment.likes['voters'].delete(current_user.id)
      end
    end
    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end

  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    def comments_tree_for(comments)
      comments.map do |comment, nested_comments|
        {
          comment: comment,
          children: comments_tree_for(nested_comments) 
        }
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def comment_params
      params.permit(Comment.column_names - ['created_at', 'updated_at'])
    end
end
