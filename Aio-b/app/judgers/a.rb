class A
  def fun(a, b)
    puts a, b
  end

  def fun(a, b, c)
    puts a, b, c
  end
end
a = A.new
a.fun(1, 2)
