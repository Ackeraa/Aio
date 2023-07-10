class Dispatcher

  def initialize(gap_time = 0.5, wait_time = 60, data)
    @gap_time = gap_time
    @wait_time = wait_time
    @system_resources = Array.new(data.length) { |i| [Mechanize.new, data[i]] } 
    @system_queue = (0...data.length).to_a 
    @system_lock = Mutex.new
    @user_resources = Hash.new
    @user_available = Hash.new
    @user_lock = Mutex.new
  end

  def distribute(account = nil)
    if Hash === account
      @user_lock.synchronize do
        if @user_resources.has_key?(account)
          come_time = Time.now
          while true do
            if @user_available[account]
              @user_available[account] = false
              return @user_resources[account], account, nil
            end
            return false if Time.now - come_time > @wait_time
            sleep @gap_time
          end
        else
          @user_resources[account] = Mechanize.new
          @user_available[account] = true
        end
      end
    elsif account.nil?
      come_time = Time.now
      @system_lock.synchronize do
        while true do
          unless @system_queue.empty?
            id = @system_queue.shift
            return @system_resources[id][0], @system_resources[id][1], id
          end
          return false if Time.now - come_time > @wait_time
          sleep @gap_time
        end
      end
    else
      return Mechanize.new, @system_resources[0][1]
    end
  end

  def recycle(data)
    if Hash === data
      @user_available[data] = true
    else
      @system_queue.push(data)
    end
  end

end
