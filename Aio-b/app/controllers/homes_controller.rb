class HomesController < ApplicationController

  # GET /homes
  def index
    total_contests = Contest.count
    total_problems = Problem.count
    total_submissions = Submission.count
    total_users = User.count
    total_groups = Group.count

    recent_problems = Problem.first(5)
    recent_contests = Contest.where('end_time > ?', Time.now).order('start_time ASC')
    top_users = User.first(5)
    
    render json: {
      total_contests: total_contests,
      total_problems: total_problems,
      total_submissions: total_submissions,
      total_users: total_users,
      total_groups: total_groups,
      recent_problems: recent_problems,
      recent_contests: recent_contests,
      top_users: top_users
    }
  end

end
