require 'test_helper'

class SolutionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @solution = solutions(:one)
  end

  test "should get index" do
    get solutions_url, as: :json
    assert_response :success
  end

  test "should create solution" do
    assert_difference('Solution.count') do
      post solutions_url, params: { solution: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show solution" do
    get solution_url(@solution), as: :json
    assert_response :success
  end

  test "should update solution" do
    patch solution_url(@solution), params: { solution: {  } }, as: :json
    assert_response 200
  end

  test "should destroy solution" do
    assert_difference('Solution.count', -1) do
      delete solution_url(@solution), as: :json
    end

    assert_response 204
  end
end
