class Contest < ApplicationRecord
  has_many :contest_problems
  has_many :problems, through: :contest_problems

  has_many :acm_contest_ranks
  has_many :user, through: :acm_contest_ranks

  has_many :oi_contest_ranks
  has_many :user, through: :oi_contest_ranks

  has_many :contest_announcements, dependent: :destroy
  has_many :submission_records, dependent: :destroy
end
