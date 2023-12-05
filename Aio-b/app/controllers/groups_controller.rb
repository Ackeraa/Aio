class GroupsController < ApplicationController
  before_action :set_group, only: %i[show update destroy get_info
                                     get_members get_contests get_problem_sets
                                     get_photo upload_photo join leave]
  before_action :authenticate_user!, only: %i[create join leave]
  before_action :set_page, only: [:index]

  # GET /groups
  def index
    render json: Group.search(params[:source], params[:query], @page, current_user)
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

  # POST /groups/1/join
  def join
    if @group.members.include?(current_user)
      render json: { error: 'Already joined' }, status: :unprocessable_entity
    else
      # FIXME: send notification to group admin
      Message.create(from: current_user.id, to: [@group.creator_id],
                     category: 'join_group', arg1: @group.id)
      render json: @group, status: :ok
    end
  end

  # POST /groups/1/leave
  def leave
    @group = Group.find(params[:id])
    if @group.members.include?(current_user)
      @group.members.delete(current_user)
      render json: @group, status: :ok
    else
      render json: { error: 'Not a member' }, status: :unprocessable_entity
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
