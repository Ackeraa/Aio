class Group < ApplicationRecord
  has_many :group_users, :class_name => 'GroupUser'
  has_many :users, through: :group_users

  has_many :teams, dependent: :destroy
  has_many :contests

  has_many :problem_sets

  has_rich_text :response
end
