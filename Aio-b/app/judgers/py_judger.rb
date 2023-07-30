require('./judger.rb')

class PyJudger < Judger

  def initialize
    super
    @run_name = 'a.py'
    runner = `realpath $(which python3)`.strip
    @run_command = "#{runner} #{@run_name}"
  end

  def submit(code, time_limit, memory_limit)
    self.save(code, @run_name)
    self.run(@run_command, time_limit, memory_limit * 1024)
  end
  
end

if __FILE__ == $0
  code = %q{
n = input()
print(n)
}
  judger = PyJudger.new
  p judger.submit(code, 1, 128)
end
