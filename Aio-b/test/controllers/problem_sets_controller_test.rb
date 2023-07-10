require 'test_helper'

class ProblemSetsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @problem_set = problem_sets(:one)
  end

  test "should get index" do
    get problem_sets_url, as: :json
    assert_response :success
  end

  test "should create problem_set" do
    assert_difference('ProblemSet.count') do
      post problem_sets_url, params: { problem_set: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show problem_set" do
    get problem_set_url(@problem_set), as: :json
    assert_response :success
  end

  test "should update problem_set" do
    patch problem_set_url(@problem_set), params: { problem_set: {  } }, as: :json
    assert_response 200
  end

  test "should destroy problem_set" do
    assert_difference('ProblemSet.count', -1) do
      delete problem_set_url(@problem_set), as: :json
    end

    assert_response 204
  end
end
