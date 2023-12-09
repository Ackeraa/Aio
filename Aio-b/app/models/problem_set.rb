class ProblemSet < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :group

  has_and_belongs_to_many :problems

  has_many :comments, as: :commentable, dependent: :destroy

  def self.search(source, query, page, user)
    source = source.downcase if source

    # all, public, private, joined
    case source
    when 'all'
      return all_search(query, page, user)
    when 'public'
      return public_search(query, page)
    when 'private'
      return private_search(query, page, user)
    when 'joined'
      return joined_search(query, page, user)
    end
  end

  private_class_method

  # All ProblemSets, only can be accessed by admin
  def self.all_search(query, page, user)
    return null_result unless user and user.role == 'admin'
    base_search(ProblemSet.all, query, page) 
  end

  # ProblemSets visible to all users
  def self.public_search(query, page)
    # group 0 is the big group that contains all public problem sets
    group = Group.find_by(id: 0)
    return null_result unless group
    base_search(group.problem_sets, query, page)
  end

  # ProblemSets created by user
  def self.private_search(query, page, user)
    return null_result unless user
    base_search(user.created_problem_sets, query, page)
  end

  # ProblemSets joined by user
  def self.joined_search(query, page, user)
    return null_result unless user
    base_search(user.joined_problem_sets, query, page)
  end

  def self.null_result
    { total: 0, problem_sets: [] }
  end

  def self.base_search(scope, query, page, per_page=20)
    conditions = "name ILIKE '%#{query}%'" if query.present?
    total = scope.where(conditions).count
    problem_sets = scope.where(conditions).order('created_at DESC')
                      .offset(page * per_page).limit(per_page)

    { total: total, problem_sets: problem_sets }
  end
end
