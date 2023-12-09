class Submission < ApplicationRecord
  belongs_to :submitter, class_name: 'User', foreign_key: 'submitter_id'
  belongs_to :problem
  belongs_to :contest


end
