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

  def self.search(group_id, source, query, page, user)
    source = source.downcase if source

    # all, public, group, private, joined
    case source
    when 'all'
      return all_search(query, page, user)
    when 'public'
      return public_search(query, page)
    when 'group'
      return group_search(group_id, query, page, user)
    when 'private'
      return private_search(query, page, user)
    when 'joined'
      return joined_search(query, page, user)
    end

    null_result
  end

  private_class_method 

  # All Contests, only can be accessed by admin
  def self.all_search(query, page, user)
    return null_result unless user and user.role == 'admin'
    base_search(Contest.all, query, page)
  end

  # Contests visible to all users
  def self.public_search(query, page)
    # group 0 is the big group that contains all public contests
    group = Group.find_by(id: 0)
    return null_result unless group
    base_search(group.contests, query, page)
  end

  # Contests created by user
  def self.private_search(query, page, user)
    base_search(user.created_contests, query, page)
  end

  # Contests created by group
  def self.group_search(group_id, query, page, user)
    return null_result unless group_id
    group = Group.find_by(id: group_id)
    return null_result unless group
    base_search(group.contests, query, page)
  end

  # Contests joined by user
  def self.joined_search(query, page, user)
    conntests = Contest.joins(:submissions).where(submissions: { user_id: user.id }).distinct
    return null_result unless contests
    base_search(contests, query, page)
  end

  def self.null_result
    { total: 0, contests: [] }
  end

  def self.base_search(scope, query, page, per_page=20)
    conditions = query.present? ? "name ILIKE '%#{query}%'" : nil
    total = scope.where(conditions).count
    contests = scope.where(conditions)
                .order("start_time desc")
                .offset(page * per_page).limit(per_page)

    { total: total, contests: contests }
  end
end