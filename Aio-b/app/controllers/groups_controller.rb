class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :update, :destroy, :get_info,
                                   :get_members, :get_contests, :get_problem_sets,
                                   :get_photo, :upload_photo]
  before_action :authenticate_user!, only: %i[create]
  before_action :set_page, only: [:search]

  # GET /groups
  def index
    @groups = Group.all
    render json: @groups
  end

  # GET /groups/search
  def search
    query = params[:query]
    total = Group.where('name ilike(?)',  "%#{query}%").count
    @groups = Group.includes(:creator)
                   .where('groups.name ilike(?)',  "%#{query}%")
                   .select('groups.*, users.name as creator_name')
                   .joins(:creator)
                   .limit(20).offset(@page * 20)
    render json: { total: total, groups: @groups }
  end

  # GET /groups/1/get_info
  def get_info
    creator = User.find(@group.creator_id).name
    total_members = @group.users.count
    total_contests = @group.contests.count
    total_problem_sets = @group.problem_sets.count
    
    render json: {
      creator: creator,
      total_members: total_members,
      total_contests: total_contests,
      total_problem_sets: total_problem_sets
    }
  end

  # GET /groups/1/get_photo
  def get_photo
    send_file @group.photo.file.file, disposition: 'inline'
  end

  # GET /groups/1/get_members
  def get_members
    render json: @group.users 
  end

  # GET /groups/1/get_contests
  def get_contests
    render json: @group.contests
  end

  # GET /groups/1/get_problem_sets
  def get_problem_sets
    render json: @group.problem_sets
  end

  # GET /groups/1
  def show
    render json: @group
  end

  # POST /groups
  def create
    @group = current_user.created_groups.new(group_params)

    if @group.save
      render json: @group, status: :created, location: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  # POST /groups/upload_photo
  def upload_photo
    @group.update(photo: params[:photo])
    if @group.save
      render json: @group.photo, status: :ok
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /groups/1
  def update
    if @group.update(group_params)
      render json: @group
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  # DELETE /groups/1
  def destroy
    @group.destroy
  end

  private

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_group
      @group = Group.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def group_params
      params.permit(Group.column_names - ['created_at', 'updated_at'])
    end
end
