# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  include DeviseTokenAuth::Concerns::User

  has_many :created_problems, class_name: "Problem", foreign_key: "creator_id"
  has_many :user_problems
  has_many :submitted_problems, through: :user_problems, source: :problem

  has_many :created_contests, class_name: "Contest", foreign_key: "creator_id"

  has_many :contest_users
  has_many :joined_contests, through: :contest_users, source: :contest

  has_many :created_problem_sets, class_name: "ProblemSet", foreign_key: "creator_id"
  has_many :user_problem_sets

  has_many :created_groups, class_name: "Group", foreign_key: "creator_id"
  has_many :group_users
  has_many :joined_groups, through: :group_users, source: :group

  has_many :acm_contest_ranks
  has_many :contests, through: :acm_contest_ranks

  has_many :oi_contest_ranks
  has_many :contests, through: :oi_contest_ranks

  has_many :comments, foreign_key: "creator_id"

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  validates :name,
    presence: { message: I18n.t("errors.messages.required") },
    uniqueness: { case_sensitive: false },
    length: { minimum: 5, too_short: I18n.t("errors.messages.too_short", count: 5),
              maximum: 10, too_long: I18n.t("errors.messages.too_long", count: 10) },
    format: { with: /\A[a-zA-Z]+[a-zA-Z0-9_]*\Z/,
              message: I18n.t("errors.messages.name_format")}
  
  mount_uploader :photo, PhotoUploader
  
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable,
         #:confirmable,
         :omniauthable,
         :authentication_keys => [:email, :name]


  def self.search(source, group_id, query, page)
    source = source.downcase if source

    case source
    when 'all'
      return all_search(query, page)
    when 'group'
      return group_search(group_id, query, page) if group_id.present?
    end

    null_result
  end


  private_class_method 

  # All Users
  def self.all_search(query, page)
    base_search(User.all, query, page)
  end

  # Users in group
  def self.group_search(group_id, query, page)
    group = Group.find_by(id: group_id)
    return null_result unless group
    base_search(group.members, query, page)
  end   
  
  def self.null_result
    { total: 0, users: [] }
  end

  def self.base_search(scope, query, page, per_page=20)
    conditions = query.present? ? ["name ILIKE ?", "%#{query}%"] : nil
    total = scope.where(conditions).count
    users = scope.where(conditions)
                .order("created_at DESC")
                .offset(page * per_page).limit(per_page)

    { total: total, users: users}
  end
end
