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
    source = 'public' if source.nil? or user.nil?

    # all, public, group, private, joined
    # group_id: 0 means public, -1 means private, 
    statements = []
    if source == 'all' and user.role != 'admin'
      group_ids = user.joined_groups.pluck(:id) + [0]
      statements << "group_id in (#{group_ids.join(',')}) or creator_id = #{user.id}"
    elsif source == 'public'
      statements << "group_id = 0"
    elsif source == 'group'
      group_ids = user.joined_groups.pluck(:id) + [-2] # -2 means no group
      statements << "group_id in (#{group_ids.join(',')})" 
    elsif source == 'private'
      statements << "creator_id = #{user.id}"
    elsif source == 'joined'
      # FIXME: maybe joined contests table will be deleted later
      statements << "id in (#{user.joined_contests.pluck(:id).join(',')})"
    end
    statements << "name ilike '%#{query}%'" if query.present?

    conditions = statements.join(' and ')

    total = Contest.where(conditions).count
    contests = Contest.where(conditions).order('start_time desc')
                      .offset(page * 20).limit(20)

    { total: total, contests: contests }
  end
end
