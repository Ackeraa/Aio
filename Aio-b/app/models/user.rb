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
  validates :name,
    presence: { message: I18n.t("errors.messages.required") },
    uniqueness: { case_sensitive: false },
    length: { minimum: 5, too_short: I18n.t("errors.messages.too_short", count: 5),
              maximum: 10, too_long: I18n.t("errors.messages.too_long", count: 10) },
    format: { with: /\A[a-zA-Z]+[a-zA-Z0-9_]*\Z/,
              message: I18n.t("errors.messages.name_format")}

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
