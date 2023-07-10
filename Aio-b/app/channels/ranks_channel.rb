class RanksChannel < ApplicationCable::Channel
  def subscribed
    stream = "ranks_#{params[:contest_id]}"
    stream_from stream 
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
