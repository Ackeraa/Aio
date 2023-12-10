class Contest < ApplicationRecord
  belongs_to :creator, class_name: 'User'

  has_and_belongs_to_many :problems

  has_many :contest_records
  has_many :participants, through: :contest_records, source: :user

  has_many :announcements, dependent: :destroy
  has_many :submissions, dependent: :destroy
  has_many :solutions, dependent: :destroy

  has_many :comments, as: :commentable, dependent: :destroy

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
