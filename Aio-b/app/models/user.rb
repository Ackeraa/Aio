# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  include DeviseTokenAuth::Concerns::User

  has_many :user_problems
  has_many :problems, through: :user_problems

  has_many :group_users
  has_many :groups, through: :group_users

  has_many :acm_contest_ranks
  has_many :contests, through: :acm_contest_ranks

  has_many :oi_contest_ranks
  has_many :contests, through: :oi_contest_ranks

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :name, presence: true, uniqueness: { case_sensitive: false }, 
            length: { minimum: 5, too_short: "is too short (minimum is 5 characters)",
                      maximum: 10, too_long: "is too long (maximum is 10 characters)"},
            format: { with: /\A[a-zA-Z]+[a-zA-Z0-9_]*\Z/,
                      message: "must start with a letter and only contain [a-zA-Z0-9_]"}

  validates :password, length: { maximum: 16, too_long: "is too long (maximum is 16 characters)"}

  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         #:confirmable,
         :omniauthable,
         :authentication_keys => [:email, :name]


end
