class ProblemSet < ApplicationRecord
  has_and_belongs_to_many :problems
  belongs_to :group
end
