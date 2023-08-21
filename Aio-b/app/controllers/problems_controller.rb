require 'securerandom'

class ProblemsController < ApplicationController
  before_action :set_problem, only: [:show, :update, :destroy, :delete_template,
                                     :delete_spj, :delete_data, :submit, :upload_template,
                                     :upload_spj, :upload_data]
  before_action :authenticate_user!, only: [:submit]
  before_action :set_page, only: [:index]

  # GET /problems?source=source&query=query
  def index
    render json: Problem.search(params[:source], params[:query], @page)
  end

  # GET /problems/1
  def show
    render json: @problem
  end

  # POST /problems
  def create
    @problem = Problem.new(problem_params)

    if @problem.save
      render json: @problem.id, status: :ok, location: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /problems/1
  def update
    if @problem.update(problem_params)
      render json: @problem
    else
      render json: @problem.errors, status: :unprocessable_entity
    end
  end

  # DELETE /problems/1
  def destroy
    @problem.destroy
  end

  # POST /problems/1/submit
  def submit
    render json: Problem.submit(@problem.source, current_user.id, params[:contest_id], @problem.id,
                          params[:contest_problem_id], params[:language]['value'], params[:code])
  end

  # POST /problems/upload_template
  def upload_template
    upload(:template)
  end

  # POST /problems/delete_template
  def delete_template
    @problem.remove_template!
    @problem.save
    render json: @problem, status: :ok
  end

  # POST /problems/upload_spj
  def upload_spj
    upload(:spj)
  end

  # POST /problems/delete_spj
  def delete_spj
    @problem.remove_spj!
    @problem.save
    render json: @problem, status: :ok
  end

  # POST /problems/upload_data
  def upload_data
    upload(:data)
  end

  # POST /problems/delete_data
  def delete_data
    @problem.remove_data!
    @problem.save
    render json: @problem, status: :ok
  end

  private

    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    def upload(type)
      @problem.update(type.to_sym => params[type]) 
      if @problem.save
        unzip(@problem.data.file.file) if type == :data
        render json: @problem.token, status: :ok
      else
        render json: @problem.errors, status: :unprocessable_entity
      end
    end

    def unzip(path)
      dir = path.rpartition('/').first
      system "cd #{dir}; rm -rf in out; mkdir in out &&\
              unzip -ojq *.zip *.in *.out && mv *.in in && mv *.out out"
    end

    def set_problem
      @problem = Problem.find(params[:id])
    end



    # Only allow a trusted parameter "white list" through.
    def problem_params
      params.permit(Problem.column_names - ['created_at', 'updated_at'],
                    allowed_languages:[:id, :value], tags:[], samples:[:sample_input, :sample_output])
    end
end
