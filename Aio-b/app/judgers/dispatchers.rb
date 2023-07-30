require('singleton')

class Dispatchers
  include Singleton
  def initialize(gap_time = 0.5, wait_time = 60)
    @gap_time = gap_time
    @wait_time = wait_time
    @numbers = 1
    @resources = Array.new(@numbers) do |i|
      system "isolate --init --box-id=#{i}"
      if $?.exitstatus != 0
        system "isolate --cleanup --box-id=#{i}"
        system "isolate --init --box-id=#{i}"
      end
      i
    end
    @lock = Mutex.new
  end

  def distribute()
    come_time = Time.now
    @lock.synchronize do
      while true do
        unless @resources.empty?
          return @resources.shift
        end
        return false if Time.now - come_time > @wait_time
        sleep @gap_time
      end
    end
  end

  def recycle(resource)
    @resources.push(resource)
  end

  def clean()
    @numbers.times do |i|
      system "isolate --cleanup --box-id=#{i}"
    end
  end

end

if __FILE__ == $0
  dispatcher = Dispatcher.new 

  threads = []
  1.times {
    threads << Thread.new {
      id = dispatcher.distribute()
      puts id
      sleep(2)
      dispatcher.recycle(id)
    }
  }
  threads.each(&:join)

  dispatcher.clean
end
