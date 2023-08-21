class Contest < ApplicationRecord
  belongs_to :creator, class_name: 'User'

  has_many :contest_problems
  has_many :problems, through: :contest_problems

  has_many :acm_contest_ranks
  has_many :users, through: :acm_contest_ranks

  has_many :oi_contest_ranks
  has_many :users, through: :oi_contest_ranks

  has_many :contest_users
  has_many :participants, through: :contest_users, source: :user

  has_many :contest_announcements, dependent: :destroy
  has_many :submission_records, dependent: :destroy
end
