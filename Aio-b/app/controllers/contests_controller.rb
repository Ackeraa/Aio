class ContestsController < ApplicationController
  before_action :set_contest, only: [:show, :update, :destroy,
                                     :problems, :add_problem, :delete_problem]
  before_action :set_page, only: [:search]

  # GET /contests
  def index
    @contests = Contest.all

    render json: @contests
  end

  # GET /contests/search
  def search
    query = params[:query]
    which = params[:addition]
    if which == 'recent'
      total = Contest.where('name ilike(?)',  "%#{query}%").count
      @contests = Contest.where('name ilike(?)',  "%#{query}%").limit(20).offset(@page * 20)
    else
    end
    render json: { total: total, contests: @contests }
  end

  # GET /contests/1
  def show
    render json: @contest
  end

  # POST /contests
  def create
    @contest = Contest.new(contest_params)

    if @contest.save
      render json: { id: @contest.id }, status: :created, location: @contest
    else
      render json: @contest.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /contests/1
  def update
    if @contest.update(contest_params)
      render json: @contest
    else
      render json: @contest.errors, status: :unprocessable_entity
    end
  end

  # DELETE /contests/1
  def destroy
    @contest.destroy
  end

  # GET /contests/1/problems
  def problems
    render json: { contest: @contest, problems: @contest.problems }
  end

  # GET /contests/1/add_problem/1
  def add_problem
    if not @contest.problems.exists?(params[:problem_id])
      @contest.problems << Problem.find(params[:problem_id])
    end
    render json: @contest.problems
  end

  # GET /contests/1/delete_problem/1
  def delete_problem
    if @contest.problems.exists?(params[:problem_id])
      @contest.problems.delete(Problem.find(params[:problem_id])) 
    end
    render json: @contest.problems
  end

  private

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_contest
      @contest = Contest.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def contest_params
      params.permit(Contest.column_names - ['created_at', 'updated_at'])
    end
end
