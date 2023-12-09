class Group < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  has_many :group_users, class_name: 'GroupUser'
  has_many :members, :through => :group_users, :source => :user

  has_many :teams, dependent: :destroy
  has_many :contests

  has_many :problem_sets

  has_rich_text :response

  mount_uploader :photo, PhotoUploader

  def self.search(source, query, page, user)
    source = source.downcase if source

    # all, public, private, joined
    case source
    when 'all我有一个contests表，由user表的'
      return all_search(query, page, user)
    when 'public'
      return public_search(query, page)
    when 'private'
      return private_search(query, page, user)
    when 'joined'
      return joined_search(query, page, user)
    end
      
    null_result
  end

  
  private_class_method 

  # All Groups, only can be accessed by admin
  def self.all_search(query, page)
    base_search(Group.all, query, page) if user.role == 'admin'
    null_result
  end

  # Groups visible to all users
  def self.public_search(query, page)
    base_search(Group.where(is_visible: true), query, page)
  end

  # Groups created by user
  def self.private_search(query, page, user)
    return null_result unless user
    base_search(user.created_groups, query, page)
  end

  # Groups joined by user
  def self.joined_search(query, page, user)
    return null_result unless user
    base_search(user.joined_groups, query, page)
  end 

  def self.null_result
    { total: 0, groups: [] }
  end

  def self.base_search(scope, query, page, per_page=20)
    conditions = query.present? ? "name ILIKE '%#{query}%'" : nil
    total = Group.where(conditions).count
    groups = Group.includes(:creator)
                  .where(conditions)
                  .select('groups.*, users.name as creator_name')
                  .joins(:creator)
                  .limit(per_page).offset(page * per_page)

    { total: total, groups: groups }
  end
end
