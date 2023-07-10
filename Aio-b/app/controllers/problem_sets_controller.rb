class ProblemSetsController < ApplicationController
  before_action :set_problem_set, only: [:show, :update, :destroy,
                                     :problems, :add_problem, :delete_problem]
  before_action :set_page, only: [:search]

  # GET /problem_sets
  def index
    @problem_sets = ProblemSet.all

    render json: @problem_sets
  end

  # GET /problem_sets/search
  def search
    which = params[:addition]
    query = params[:query]
    if which == 'public'
      if query.nil?
        total = ProblemSet.count
        @problem_sets = ProblemSet.limit(20).offset(@page * 20)
      else
        total = ProblemSet.where('name ilike(?)',  "%#{query}%").count
        @problem_sets = ProblemSet.where('name ilike(?)',  "%#{query}%").limit(20).offset(@page * 20)
      end
    else
      # Need to be fixed.
      total = ProblemSet.count
      @problem_sets = ProblemSet.limit(20).offset(@page * 20)
    end
    render json: { total: total, problem_sets: @problem_sets }
  end

  # GET /problem_sets/1/problems
  def problems
    render json: @problem_set.problems
  end

  # GET /problem_sets/1/add_problem/1
  def add_problem
    if not @problem_set.problems.exists?(params[:problem_id])
      @problem_set.problems << Problem.find(params[:problem_id])
    end
    render json: @problem_set.problems
  end

  # GET /problem_sets/1/delete_problem/1
  def delete_problem
    if @problem_set.problems.exists?(params[:problem_id])
      @problem_set.problems.delete(Problem.find(params[:problem_id])) 
    end
    render json: @problem_set.problems
  end

  # GET /problem_sets/1
  def show
    render json: @problem_set
  end

  # POST /problem_sets
  def create
    @problem_set = ProblemSet.new(problem_set_params)

    if @problem_set.save
      render json: @problem_set, status: :created, location: @problem_set
    else
      render json: @problem_set.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /problem_sets/1
  def update
    if @problem_set.update(problem_set_params)
      render json: @problem_set
    else
      render json: @problem_set.errors, status: :unprocessable_entity
    end
  end

  # DELETE /problem_sets/1
  def destroy
    @problem_set.destroy
  end

  private

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_problem_set
      @problem_set = ProblemSet.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def problem_set_params
      params.permit(ProblemSet.column_names - ['created_at', 'updated_at'])
    end
end
