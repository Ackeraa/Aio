#include <stdio.h>
#include <ctype.h>

#define AC 0
#define WA 1
#define ARGUMENT_ERROR -1
#define STD_INPUT_ERROR -2
#define STD_OUTPUT_ERROR -3
#define USER_OUTPUT_ERROR -4

int spj(FILE* std_input, FILE* std_output, FILE* user_output) {
	/* This is an example:
	char std_ans, user_ans;
	fscanf(std_output, "%c", &std_ans);
	fscanf(user_output, "%c", &user_ans);
	return tolower(std_ans) == tolower(user_ans) ? AC : WA;
	*/

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
