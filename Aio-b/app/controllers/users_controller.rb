class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :get_info, :get_contests,
                                  :get_problems, :get_groups, :get_friends, :upload_photo,
                                  :get_photo, :connect]
  before_action :set_page, only: []

  # GET /users
  def index
    render json: User.search(params[:source], params[:group_id], 
          params[:query], @page)
  end

  # GET /users/1
  def show
    render json: @user
  end

  # GET /users/1/get_photo
  def get_photo
    send_file @user.photo.file.file, disposition: 'inline'
  end

  # GET /users/1/get_info
  def get_info
    total_contests = @user.contests.count
    total_problems = @user.problems.count
    total_groups = @user.groups.count
    total_followers = @user.followers.size
    total_following = @user.following.size
    render json: {
      user: @user,
      total_contests: total_contests,
      total_problems: total_problems,
      total_groups: total_groups,
      total_followers: total_followers,
      total_following: total_following
    }
  end

  # GET /users/1/get_contests
  def get_contests
    render json: @user.contests
  end

  # GET /users/1/get_problems
  def get_problems
    render json: @user.problems
  end

  # GET /users/1/get_groups
  def get_groups
    render json: @user.groups
  end

  # GET /users/1/get_friends
  def get_friends
    render json: { followers: @user.followers, following: @user.following }
  end

  # POST /users/1/connect
  def connect
    which = params[:which]
    account = params[:account]
    spider = get_spider(which)
    if spider.account_available(account)
      @user.oj_accounts = Hash.new(0) if @user.oj_accounts.nil?
      @user.oj_accounts[which] = account 
      @user.save
      render json: @user.oj_accounts
    else
      render json:@user.errors, status: :unprocessable_entity
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # POST /users/upload_photo
  def upload_photo
    puts "dsdasd", params[:photo]
    @user.update(photo: params[:photo])
    if @user.save
      render json: @user.photo, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

    def get_spider(source)
      which = source.capitalize
      "#{which}::#{which}Spider".constantize.new
    end

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.permit(User.column_names - ['created_at', 'updated_at'])
    end
end
