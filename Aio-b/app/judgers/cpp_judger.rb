class CppJudger < Judger

  def initialize(problem_id, if_need_sandbox = true)
    data_path = "/root/Aio-b/public/uploads/problem/data/#{problem_id}" 
    super(data_path, if_need_sandbox)
  end
  
  def submit(*args)
    if args.size == 1
      # just text
      set_text_params
      p 1 
    elsif args.size == 3
      # normal submit
      set_normal_params
      code, time_limit, memory_limit = args

      self.save(code, @compile_name)
      compile_result = self.compile(@compile_command)
      return { result: :CE, error_message: compile_result } unless compile_result.empty?

      run_result = self.run(@run_command, time_limit, memory_limit * 1025)
    elsif args.size == 4
      # with spj
      set_spj_params
      code, spj_code, time_limit, memory_limit = args

      self.save(code, @compile_name)
      compile_result = self.compile(@compile_command)
      return { result: :CE, error_message: compile_result } unless compile_result.empty?

      self.save(spj_code, @spj_compile_name)

      spj_compile_result = self.compile(@spj_compile_command)
      return { result: :SPJ_CE, error_message: spj_compile_result } unless spj_compile_result.empty?

      run_result = self.run(@run_command, @spj_run_command, time_limit, memory_limit * 1025)
    end
  end
  
  private

    def set_text_params
      @compare_name = 'a.txt'
    end

    def set_normal_params
      compiler = `realpath $(which g++)`.strip
      @compile_name = 'a.cpp'
      @compile_command = "#{compiler} -o a #{@compile_name}"
      @run_command = './a'
    end

    def set_spj_params
      set_normal_params
      compiler = `realpath $(which gcc)`.strip
      @spj_compile_name = 'spj.c'
      @spj_compile_command = "#{compiler} -o spj #{@spj_compile_name}"
      @spj_run_command = './spj'
    end
end

if __FILE__ == $0
  code = %q{
    #include <stdio.h>
    int a[10000];
    int main()
    {
      int n;
      scanf("%d", &n);
      for (int i = -1; i < 1000; i++) a[i] = i;
      printf("%d\n", n);
    }
  }
  spj_code = %q{
#include <stdio.h>
#include <ctype.h>

#define AC 0
#define WA 1
#define ARGUMENT_ERROR -1
#define STD_INPUT_ERROR -2
#define STD_OUTPUT_ERROR -3
#define USER_OUTPUT_ERROR -4

int spj(FILE* std_input, FILE* std_output, FILE* user_output) {
	int std_ans, user_ans;
	fscanf(std_output, "%d", &std_ans);
	fscanf(user_output, "%d", &user_ans);
	return std_ans == user_ans ? AC : WA;

	// Write Your code here.
}

// Do not modify the following code.
int main(int argc, char* args[]) {

	if (argc != 4) {
		printf("Parameters shoule be: std_input std_output user_output\n");
		return ARGUMENT_ERROR;
	}

	// Open file.
	FILE* std_input = fopen(args[1], "r");
	if (std_input == NULL) {
		printf("Can not open std_input file\n");
		return STD_INPUT_ERROR;
	}

	FILE* std_output = fopen(args[2], "r");
	if (std_output == NULL) {
		printf("Can not open std_output file\n");
		return STD_OUTPUT_ERROR;
	}

	FILE* user_output = fopen(args[3], "r");
	if (user_output == NULL) {
		printf("Can not open user_output file\n");
		return USER_OUTPUT_ERROR;
	}

	int result = spj(std_input, std_output, user_output);
	if (result == AC) {
		printf("Accept\n");
	} else {
		printf("Wrong Answer\n");
	}

	// Close file.
	if (std_input != NULL) {
		fclose(std_input);
	}

	if (std_output != NULL) {
		fclose(std_output);
	}
	
	if (user_output != NULL) {
		fclose(user_output);
	}
	
	return result;
}
  }
  judger = CppJudger.new
  p judger.submit(code, spj_code, 2, 20)
end
