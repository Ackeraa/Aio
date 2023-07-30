class Judger

  def initialize(data_path, need_sandbox)
    if need_sandbox
      @box = 0#Dispatcher.instance.distribute
      @box_path = "/var/local/lib/isolate/#{@box}/box"
    end
    @data_path = data_path
  end
  
  def save(code, name)
    path = "#{@box_path}/#{name}"
    File.write(path, code)
  end

  def compile(command)
    `isolate -b #{@box} -p --stderr-to-stdout --full-env --run -- #{command}`
  end

  def run(*args)
    if args.size == 3
      # normal
      command, time_limit, memory_limit = args
    elsif args.size == 4
      # with spj
      command, spj_command, time_limit, memory_limit = args
    end
    datas = `ls #{@data_path}/in | wc -l`.to_i
    results = []
    (1..datas).each do |i|
      std_input = "#{@data_path}/in/#{i}.in"
      std_output = "#{@data_path}/out/#{i}.out"
      user_output = "#{@box_path}/out/#{i}.out"
      meta = "#{@box_path}/meta"

      system "isolate -b #{@box} --full-env --time=#{time_limit} --mem=#{memory_limit} \
               --meta=#{meta} --run -- #{command}<#{std_input}>#{user_output}"

      meta_data = {}
      `cat #{meta}`.split("\n").each do |line|
        tmp = line.split(':')
        meta_data[tmp[0]] = tmp[1] 
      end
      time_usage = meta_data['time'].to_f * 1000
      memory_usage = meta_data['max-rss'].to_f / 1024
      if meta_data['exitcode'] == '0'
        unless spj_command.nil?
          user_output = "out/#{i}.out"
          system "isolate -b #{@box} --full-env --time=#{time_limit} --mem=#{memory_limit} \
                  --dir=#{@data_path} --run -- #{spj_command} #{std_input} #{std_output} #{user_output}>/dev/null"
          result = $?.exitstatus == 0 ? :AC : :WA
        else
          result = `diff #{std_output} #{user_output}`.empty? ? :AC : :WA
        end
      elsif meta_data['message'] == 'Time limit exceeded'
        result = :TLE
      elsif meta_data['message'] == 'Caught fatal signal 11'
        result = :MLE
      else
        result = :RE
      end
      results << { result: result, time_usage: time_usage, memory_usage: memory_usage }
    end
    results
  end

  def upzip(filename)
    system 'mkdir in out && unzip -q 1.zip && mv *.in in && mv *.out out'
  end

  def clean
    system = 'rm -r in out'
  end

end

if __FILE__ == $0
  grader = Grader.new
  #grader.upzip('2')
  grader.compile
  p grader.run
  #grader.clean() 
end
