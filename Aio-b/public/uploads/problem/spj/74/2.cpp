#include <bits/stdc++.h>

using namespace std;

int months[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

bool check(int year, int month, int day)
{
	if (!month || month > 12 || !day) return false;
	if (month != 2 && day > months[month]) return false;
	if (month == 2)
	{
		bool leap = (year % 4 == 0 && year % 100) || year % 400 == 0;
		return day <= 28 + leap;
	}

	return true;
}

int main()
{
	int n;
	cin >> n;

	int m = 0;
	int start = 20200824 + 1;
	int end = start + (n / 365 + 1) * 10000;
	for (int date = start; date <= end; date++)
	{
		int year = date / 10000;
		int month = (date % 10000) / 100;
		int day = date % 100;
		if (check(year, month, day))
		{
			m++;
			if (m == n)
			{
				printf("%d/%02d/%02d\n", year, month, day);
			}
		}
	}

	return 0;
}


