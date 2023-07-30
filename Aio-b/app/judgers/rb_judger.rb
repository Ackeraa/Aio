require('./judger.rb')

class RbJudger < Judger

  def initialize
    super
    @run_name = 'a.rb'
    runner = `realpath $(which ruby)`.strip
    @run_command = "#{runner} #{@run_name}"
  end

  def submit(code, time_limit, memory_limit)
    self.save(code, @run_name)
    self.run(@run_command, time_limit, memory_limit * 1024)
  end
  
end

if __FILE__ == $0
  code = %q{
  p 2
}
  judger = RbJudger.new
  p judger.submit(code, 1, 128)
end
