module ProblemsHelper
  def self.submit(source, user_id, contest_id, problem_id, contest_problem_id, language, code)
    contest_id = contest_id || 0
    submission = Submission.create(
      problem_id: @problem.id,
      contest_id: contest_id,
      user_id: user_id,
      result: "judging"
    )
    submission_broadcast submission, contest_id, problem_id, user_id

    # If is contest problem.
    if contest_id != 0
      contest = Contest.find(contest_id)
      start_time = contest.start_time
      end_time = contest.end_time
      cost_time = (Time.now - start_time) / 60
      contest_user = ContestUser.find_by(contest_id: contest_id, user_id: user_id)

      # First submit in this contest.
      if contest_user.nil?
        contest_user = ContestUser.create(
          contest_id: contest_id,
          user_id: user.id,
          submission_info: {}
        )
      end

      # First submit for this problem.
      if contest_user.submission_info[contest_problem_id].nil?
        contest_user.submission_info[contest_problem_id] = {
          time: cost_time,
          submissions: 1,
          result: 'pending'
        }
        is_already_ac = false
      else
        is_already_ac = contest_user.submission_info[contest_problem_id][:result] == 'AC'
        # Do not update if already AC.
        unless is_already_ac
          submission_info = contest_user.submission_info[contest_problem_id]
          submission_info[:submissions] += 1
          submission_info[:time] = cost_time
          submission_info[:result] = 'pending'
        end
      end
      contest_user.save!
      ranks_broadcast contest_user
    end

    # Judge in another thread.
    Thread.new do
      if source.downcase == 'aio':
        spider = get_spider(source)
        results = spider.submit(vid, language, code)
      else
        judger = self.get_judger(problem_id, language)
        results = judger.submit(code, 2000, 256)
      end
      submission.update!(results: results)
      submission_broadcast submission, contest_id, problem_id, user_id
    end
  end

  private

  def get_judger(problem_id, language)
    which = language.capitalize
    which = 'Cpp'
    "#{which}Judger".constantize.new(problem_id)
  end

  def get_spider(source)
    which = source.capitalize
    "#{which}::#{which}Spider".constantize.new
  end

  def submission_broadcast(submission, contest_id, problem_id, user_id)
    # Broadcast to 4 streams: contest_problem, contest, user, all.
    streams = [
      submission_stream(contest_id, problem_id, user_id),
      submission_stream(contest_id, problem_id, 0),
      submission_stream(contest_id, 0, user_id),
      submission_stream(contest_id, 0, 0)
    ]

    streams.each { |stream| ActionCable.server.broadcast(stream, submission) }
  end

  def ranks_broadcast(contest_user)
    ActionCable.server.broadcast ranks_stream, contest_user
  end

  def submission_stream(contest_id, problem_id, user_id)
    "submission_#{contest_id}_#{problem_id}_#{user_id}"
  end

  def ranks_stream
    "ranks_#{contest_id}"
  end

end
