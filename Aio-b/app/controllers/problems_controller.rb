require 'securerandom'

class ProblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy, :delete_template,
                                     :delete_spj, :delete_data, :submit, :upload_template,
                                     :upload_spj, :upload_data]
  before_action :authenticate_user!, only: [:submit]

  # GET /problems
  def index
    #@user = current_user
    #UserMailer.with(user: @user).welcome_email.deliver
    @problems = Problem.first(10)

    render json: @problems
  end

  # GET /problems/search?source=source&query=query
  def search
    #Need to be fixed if source is empty.
    source = params[:source]
    query = params[:query]
    if query.nil? 
      @problems = Problem.where(source: source) 
    else
      @problems = Problem.where('source=? and lower(name) like (?)',
                                source.downcase, "%#{query.downcase}%") 
    end

    render json: @problems
  end

  # GET /problems/1
  def show
    render json: @problem
  end

  # POST /problems
  def create
    @problem = Problem.new(problem_params)

    if @problem.save
      render json: @problem.id, status: :ok, location: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /problems/1
  def update
    if @problem.update(problem_params)
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /problems/1
  def destroy
    @problem.destroy
  end

  # POST /problems/1/submit
  def submit
    user = current_user
    code = params[:code]
    language = params[:language]['value']
    contest_id = params[:contest_id] || 0
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
      judger = get_judger(language)
      new_submissions = judger.submit(code, 2000, 256)
      new_submission = { result: :AC, time_usage: 0, memory_usage: 0, solution_size: code.size }
      new_submissions.each do |item|
        new_submission[:time_usage] += item[:time_usage]
        new_submission[:memory_usage] += item[:memory_usage]
        new_submission[:result] = item[:result] if item[:result] != :AC and
                                                   new_submission[:result] != :AC 
      end
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

  # POST /problems/upload_template
  def upload_template
    upload(:template)
  end

  # POST /problems/delete_template
  def delete_template
    @problem.remove_template!
    @problem.save
    render json: @problem, status: :ok
  end

  # POST /problems/upload_spj
  def upload_spj
    upload(:spj)
  end

  # POST /problems/delete_spj
  def delete_spj
    @problem.remove_spj!
    @problem.save
    render json: @problem, status: :ok
  end

  # POST /problems/upload_data
  def upload_data
    upload(:data)
  end

  # POST /problems/delete_data
  def delete_data
    @problem.remove_data!
    @problem.save
    render json: @problem, status: :ok
  end

  private

    def upload(type)
      @problem.update(type.to_sym => params[type]) 
      if @problem.save
        unzip(@problem.data.file.file)
        render json: @problem.token, status: :ok
      else
        render json: @problem.errors, status: :unprocessable_entity
      end
    end

    def unzip(path)
      dir = path.rpartition('/').first
      system "cd #{dir}; rm -rf in out; mkdir in out &&\
              unzip -ojq *.zip *.in *.out && mv *.in in && mv *.out out"
    end

    def set_problem
      @problem = Problem.find(params[:id])
    end

    def get_judger(language)
      which = language.capitalize
      which = 'Cpp'
      "#{which}Judger".constantize.new(@problem.id)
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
                    allowed_languages:[:id, :value], tags:[], samples:[:sample_input, :sample_output])
    end
end
