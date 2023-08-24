class Problem < ActiveRecord::Base
  belongs_to :creator, class_name: 'User'
  has_many :user_problems, class_name: 'UserProblem'
  has_many :submitters, through: :user_problems, source: :user

  has_many :contest_problems
  has_many :contests, through: :contest_problems

  has_many :comments, dependent: :destroy
  has_many :submission_records, dependent: :destroy
  has_many :solutions, dependent: :destroy
  has_and_belongs_to_many :problem_sets
  has_and_belongs_to_many :contests

  mount_uploader :template, TemplateUploader
  mount_uploader :spj, SpjUploader
  mount_uploader :data, DataUploader

  def self.search(source, query, page)
    source = source.downcase if source
    
    return null_result unless source
    return base_search(Problem.all, query, page) if source == 'all'
    base_search(Problem.where(source: source), query, page)
  end

  private_class_method 

  def self.null_result
    { total: 0, problems: [] }
  end

  def self.base_search(scope, query, page, per_page=20)
    conditions = "name ILIKE '%#{query}%'" if query.present?
    total = scope.where(conditions).count
    problems = scope.where(conditions).select(
      :id,
      :vid,
      :name,
      :source,
      :submissions,
      :accepts
    ).order(:id).limit(per_pagge).offset(page * per_page)

    { total: total, problems: problems }
  end

end
