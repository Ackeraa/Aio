class VproblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy, :respide, :submit]
  before_action :set_page, only: [:search]
  before_action :authenticate_user!, only: [:submit]

  # GET /vproblems
  # Need to be fixed.
  def index
    @problems = Problem.where(source: params[:source]).first(10)
    if @problems.nil? or @problems.empty?
      spider = get_spider(params[:source])
      problems = spider.spide_problems
      problems.each do |problem|
        Problem.create(problem)
      end
      @problems = Problem.where(source: params[:source]).first(10)
    end
    render json: @problems
  end

  # GET /vproblems/search
  # Need to be fixed when source is nil.
  def search
    source = params[:source]
    query = params[:query]

    if query.nil? or query.empty?
      total = Problem.where(source: source).count
      @problems = Problem.where(source: source).order(:id).limit(20).offset(@page * 20)
      if @problems.empty?
        puts "FUCK YOU SPIDE AGAIN, BUG APPEARS"
        spider = get_spider(source)
        problems = spider.spide_problems
        problems.each do |problem|
          Problem.create(problem)
        end
        total = Problem.where(source: source).count
        @problems = Problem.where(source: source).order(:id).limit(20).offset(@page * 20)
      end
    else
      total = Problem.where('source=? and name ilike (?)', source.downcase, "%#{query}%").count
      @problems = Problem.where('source=? and name ilike (?)', 
                                source.downcase, "%#{query}%")
                         .order(:id).limit(20).offset(@page * 20)
    end
    render json: { total: total, problems: @problems }
  end

  # GET /vproblems/1
  def show
    if @problem.description.nil?
      spider = get_spider(@problem.source)
      problem = spider.spide_problem(@problem.vid)  # need to be fixed, when problem is nil.
      allowed_languages = Language.find_by(source: @problem.source).allowed_languages # need to be fixed, when problem is nil.
      problem[:allowed_languages] = allowed_languages
      @problem.update(problem)
    end
    render json: @problem
  end

  # POST /vproblems
  def create
    @problem = Problem.find_by(token: params[:token])

    if @problem.update(problem_params)
      render json: @problem.token, status: :ok, location: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /vproblems/1
  def update
=begin
    if @problem.update(problem_params)
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
=end
  end

  # POST /vproblems/1/submit
  def submit
    user = current_user
    source = @problem.source
    vid = @problem.vid
    code = params[:code].dump
    language = params[:language]
    contest_id = params[:contest_id] || 0
    user_id = params[:user_id]

    submission = Submission.create(
      problem_id: @problem.id,
      contest_id: contest_id,
      user_id: user.id,
      result: "judging"
    )
    submission_broadcast submission

    is_contest = contest_id != 0
    if is_contest
      contest_problem_id = params[:contest_problem_id]
      contest = Contest.find(contest_id)
      start_time = contest.start_time
      end_time = contest.end_time
      cost_time = (Time.now - start_time) / 60
      acm_contest_rank = AcmContestRank.find_by(contest_id: contest_id, user_id: user_id)

      if acm_contest_rank.nil?
        acm_contest_rank = AcmContestRank.create(
          contest_id: contest_id,
          user_id: user.id,
          user_name: user.name,
          submissions: 0,
          accepts: 0,
          time: 0,
          submission_info: {}
        )
      end
      # First submit.
      if acm_contest_rank.submission_info[contest_problem_id].nil?
        acm_contest_rank.submissions += 1
        acm_contest_rank.time += cost_time
        acm_contest_rank.submission_info[contest_problem_id] = {
          time: cost_time,
          submissions: 1,
          result: 'pending'
        }
        is_already_ac = false
      else
        is_already_ac = acm_contest_rank.submission_info[contest_problem_id][:result] == 'AC'
        unless is_already_ac
          acm_contest_rank.submission += 1
          acm_contest_rank.time += cost_time
          acm_contest_rank.submission_info[contest_problem_id][:time] += cost_time
          acm_contest_rank.submission_info[contest_problem_id][:submissions] += 1
          acm_contest_rank.submission_info[contest_problem_id][:result] = 'pending'
        end
      end
      acm_contest_rank.save
      ranks_broadcast acm_contest_rank
    end

    Thread.new do
      spider = get_spider(source)
      new_submission = spider.submit(vid, language, code)
      submission.update(new_submission)
      submission_broadcast submission

      if is_contest and not is_already_ac
        acm_contest_rank.submission_info[contest_problem_id][:result] = submission[:result]
        acm_contest_rank.accepts += 1 if submission[:result] == 'AC'
        acm_contest_rank.save
        ranks_broadcast acm_contest_rank
      end
    end
    render json: submission
  end
  
  # GET /vproblems/respide/1
  def respide
    spider = get_spider(@problem.source)
    problem = spider.spide_problem(@problem.vid)
    @problem.update(problem)
    render json: @problem
  end

  # GET /vproblems/respides
  # Need to be fixeds
  def respides
    n = Problem.where(source: params[:source]).count
    spider = get_spider(params[:source])
    problems = spider.spide_problems(n)
    problems.each do |problem| 
      Problem.create(problem)
    end
    @problems = Problem.where(source: params[:source]).limit(10).order(:id).reverse_order
    render json: @problems
  end

  # DELETE /vproblems/1
  def destroy
    @problem.destroy
  end

  private
    
    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    def set_problem
      @problem = Problem.find(params[:id])
    end

    def get_spider(source)
      which = source.capitalize
      "#{which}::#{which}Spider".constantize.new
    end

    def submission_broadcast(submission)
      ActionCable.server.broadcast cpu_submission_stream, submission
      ActionCable.server.broadcast cp_submission_stream, submission
      ActionCable.server.broadcast cu_submission_stream, submission
      ActionCable.server.broadcast c_submission_stream, submission
    end

    def ranks_broadcast(acm_contest_rank)
      ActionCable.server.broadcast ranks_stream, acm_contest_rank
    end

    def ranks_stream
      "ranks_#{params[:contest_id]}"
    end
    # contest_problem_user
    def cpu_submission_stream
      "submission_#{params[:contest_id] || 0}_#{params[:id]}_#{params[:user_id]}"
    end

    def cp_submission_stream
      "submission_#{params[:contest_id] || 0}_#{params[:id]}_0}"
    end

    def cu_submission_stream
      "submission_#{params[:contest_id] || 0}_0_#{params[:user_id]}"
    end

    def c_submission_stream
      "submission_#{params[:contest_id] || 0}_0_0"
    end

    # Only allow a trusted parameter "white list" through.
    def problem_params
      params.permit(Problem.column_names - ['created_at', 'updated_at'], 
                    allowed_languages:[], tags:[], samples:[:sampleInput, :sampleOutput])
    end
end
