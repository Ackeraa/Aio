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
    statement = []
    
    if source.present? && source != 'all'
      statement << "source = '#{source}'"
    end

    if query.present?
      statement << "name ilike '%#{query}%'"
    end

    conditions = statement.join(' and ')

    total = Problem.where(conditions).count
    problems = Problem.where(conditions).select(
      :id,
      :vid,
      :name,
      :source,
      :submissions,
      :accepts
    ).order(:id).limit(20).offset(page * 20)

    { total: total, problems: problems }
  end

end
