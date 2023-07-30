class CJudger < Judger

  def initialize
    super
    @compile_name = 'a.c'
    compiler = `realpath $(which gcc)`.strip
    @compile_command = "#{compiler} #{@compile_name}"
    @run_command = './a.out'
  end

  def submit(code, time_limit, memory_limit)
    self.save(code, @compile_name)
    self.compile(@compile_command)
    self.run(@run_command, time_limit, memory_limit * 1024)
  end
  
end

if __FILE__ == $0
  code = %q{
    #include <stdio.h>
    int a[10001];
    int main()
    {
      int n;
      scanf("%d", &n);
      printf("%d\n", n);
    }
  }
  judger = CJudger.new
  p judger.submit(code, 1, 128)
end
