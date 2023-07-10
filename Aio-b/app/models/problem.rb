class Problem < ActiveRecord::Base
  has_many :user_problems, :class_name => 'UserProblem'
  has_many :users, through: :user_problems

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
end
