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
    source = 'all' if source.nil? or user.nil?

    # all, private, joined
    statements = []
    if source == 'private'
      statements << "creator_id = #{user.id}"
    elsif source == 'joined'
      # FIXME: maybe slow
      groups_ids = user.joined_groups.pluck(:id) + [-2] # -2 means no group
      statements << "id in (#{groups_ids.join(',')})"
    end
    statements << "name ilike '%#{query}%'" if query.present?

    conditions = statements.join(' and ')

    total = Group.where(conditions).count
    groups = Group.includes(:creator)
                   .where(conditions)
                   .select('groups.*, users.name as creator_name')
                   .joins(:creator)
                   .limit(20).offset(page * 20)

    { total: total, groups: groups }
  end
end
