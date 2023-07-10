#include <bits/stdc++.h>

using namespace std;

int n, m;
int a[1009];

int gcd(int a, int b)
{
	return b == 0 ? a : gcd(b, a % b);
}

bool check(int x, int y)
{
	return x < y && gcd(x, y) == 1;
}

int main()
{
	cin >> n;
	m = 0;
	for (int i = 0; i < n; i++)
	{
		cin >> a[i];
	}

	for (int i = 0; i < n; i++)
	{
		for (int j = i + 1; j < n; j++)
		{
			if (check(a[i], a[j]))
			{
				m++;
			}
		}
	}
	
	cout << m << endl;

	return 0;
}
	
