class ProblemSet < ApplicationRecord
  has_and_belongs_to_many :problems
  belongs_to :group

  def self.search(source, query, page, user)
    source = source.downcase if source
    source = 'public' if source.nil? or user.nil?

    # all, public, private, joined
    statements = []
    if source == 'all' and user.role != 'admin'
      group_ids = user.joined_groups.pluck(:id) + [0]
      statements << "group_id in (#{group_ids.join(',')}) or creator_id = #{user.id}"
    elsif source == 'public'
      statements << "group_id = 0"
    elsif source == 'private'
      statements << "creator_id = #{user.id}"
    elsif source == 'joined'
      group_ids = user.joined_groups.pluck(:id) + [-2] # -2 means no group
      statements << "group_id in (#{group_ids.join(',')})"
    end
    statements << "name ilike '%#{query}%'" if query.present?

    conditions = statements.join(' and ')

    total = ProblemSet.where(conditions).count
    problem_sets = ProblemSet.where(conditions).order('created_at desc')
                      .offset(page * 20).limit(20)

    { total: total, problem_sets: problem_sets }
  end
end
