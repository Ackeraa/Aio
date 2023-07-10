class SubmissionsChannel < ApplicationCable::Channel
  def subscribed
    stream = "submission_#{params[:contest_id] || 0}_#{params[:problem_id] || 0}_#{params[:user_id] || 0}" 
    puts "STREAM FROM", stream
    stream_from stream
  end

  def unsubscribed

  end
end
