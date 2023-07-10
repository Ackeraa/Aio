require 'test_helper'

class DiscussionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @discussion = discussions(:one)
  end

  test "should get index" do
    get discussions_url, as: :json
    assert_response :success
  end

  test "should create discussion" do
    assert_difference('Discussion.count') do
      post discussions_url, params: { discussion: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show discussion" do
    get discussion_url(@discussion), as: :json
    assert_response :success
  end

  test "should update discussion" do
    patch discussion_url(@discussion), params: { discussion: {  } }, as: :json
    assert_response 200
  end

  test "should destroy discussion" do
    assert_difference('Discussion.count', -1) do
      delete discussion_url(@discussion), as: :json
    end

    assert_response 204
  end
end
