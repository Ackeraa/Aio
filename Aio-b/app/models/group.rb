class Group < ApplicationRecord
  belongs_to :creator, :class_name => 'User'
  has_many :group_users, :class_name => 'GroupUser'
  has_many :members, :through => :group_users, :source => :user

  has_many :teams, dependent: :destroy
  has_many :contests

  has_many :problem_sets

  has_rich_text :response

  mount_uploader :photo, PhotoUploader

end
