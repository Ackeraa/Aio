class AcmContestRanksController < ApplicationController
  before_action :set_acm_contest_rank, only: [:show, :update, :destroy]

  # GET /acm_contest_ranks
  def index
    @acm_contest_ranks = AcmContestRank.all

    render json: @acm_contest_ranks
  end

  # GET /acm_contest_ranks/1
  def show
    render json: @acm_contest_rank
  end

  # GET /acm_contest_ranks/get_contest_rank
  def get_contest_rank
    @acm_contest_rank = AcmContestRank.where(contest_id: params[:contest_id])
    render json: @acm_contest_rank
  end

  # POST /acm_contest_ranks
  def create
    @acm_contest_rank = AcmContestRank.new(acm_contest_rank_params)

    if @acm_contest_rank.save
      render json: @acm_contest_rank, status: :created, location: @acm_contest_rank
    else
      render json: @acm_contest_rank.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /acm_contest_ranks/1
  def update
    if @acm_contest_rank.update(acm_contest_rank_params)
      render json: @acm_contest_rank
    else
      render json: @acm_contest_rank.errors, status: :unprocessable_entity
    end
  end

  # DELETE /acm_contest_ranks/1
  def destroy
    @acm_contest_rank.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_acm_contest_rank
      @acm_contest_rank = AcmContestRank.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def acm_contest_rank_params
      params.fetch(:acm_contest_rank, {})
    end
end
