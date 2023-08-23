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

  def self.search(source, query, page, user)
    source = source.downcase if source

    # all, public, group, private, joined
    # group_id: 0 means public, -1 means private, 
    case source
    when 'all'
      return all_search(query, page, user)
    when 'public'
      return public_search(query, page)
    when 'group'
      return group_search(query, page, user)
    when 'private'
      return private_search(query, page, user)
    when 'joined'
      return joined_search(query, page, user)
    end

    null_result
  end


  private_class_method def self.all_search(query, page, user)
    if user.role == 'admin'
      conditions = query.present? ? "name ILIKE '%#{query}%'" : nil
      return base_search(Contest, conditions, page)
    end
    null_result
  end

  private_class_method def self.public_search(query, page)
    conditions = query.present? ? "name ILIKE '%#{query}%'" : nil
    group = Group.find_by(id: 0)
    base_search(group.contests, conditions, page)
  end

  private_class_method def self.private_search(query, page, user)
    conditions = query.present? ? "name ILIKE '%#{query}%'" : nil
    base_search(user.contests, conditions, page)
  end

  private_class_method def self.group_search(group_id, query, page, user)
    conditions = query.present? ? "name ILIKE '%#{query}%'" : nil
    group = Group.find_by(id: group_id)
    base_search(group.contests, conditions, page)
  end

  private_class_method def self.null_result
    { total: 0, contests: [] }
  end

  private_class_method def self.base_search(scope, conditions, page, per_page=20)
    total = scope.where(conditions).count
    contests = scope.where(conditions)
                .order("start_time desc")
                .offset(page * per_page).limit(per_page)

    { total: total, contests: contests }
  end


end
