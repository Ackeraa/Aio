require 'test_helper'

class SubmissionRecordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @submission_record = submission_records(:one)
  end

  test "should get index" do
    get submission_records_url, as: :json
    assert_response :success
  end

  test "should create submission_record" do
    assert_difference('SubmissionRecord.count') do
      post submission_records_url, params: { submission_record: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show submission_record" do
    get submission_record_url(@submission_record), as: :json
    assert_response :success
  end

  test "should update submission_record" do
    patch submission_record_url(@submission_record), params: { submission_record: {  } }, as: :json
    assert_response 200
  end

  test "should destroy submission_record" do
    assert_difference('SubmissionRecord.count', -1) do
      delete submission_record_url(@submission_record), as: :json
    end

    assert_response 204
  end
end
