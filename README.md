# AIO

## Log

* 2020.11.22  数据库结构初步设计
* 220.11.23 基础开发流程及知识记录
* 2020.11.24-2020.11.27 "Agile Web Development with Rails 6" 学习
* 2020.11.28 混 
* 2020.11.29-12.4 实现部分爬虫功能，准备重新学习Anjularjs，开发单页应用。
* 2020.12.5 改用rails API模式，删掉重搞。。。
* 2020.12.6-2020.12.22 混
* 2020.12.23 前后端分离
*  2020.12.24-2023.12.8 Busy
*  2023.12.9 修复user setting，将数据库表结构复制到readme

## TODO
* [ ] Fix User Module

* [ ] Fix Group Module
* [ ] Fix Problem Module
* [ ] Fix Contest Module
* [ ] Fix ProblemSet Module
* [ ] Fix Comment Module
* [ ] Add AI

## Database

### Relation

#### User

```ruby
class User
  has_many :events
  has_many :comments
  has_many :solutions
  has_many :submissions, dependent: :destroy
  has_and_belongs_to_many :auth_permissions
  has_many :groups, through :group_members
  has_many :problems, through :user_problems
end
  
```

#### AuthPermission

```ruby
class AuthPermissions
  has_and_belongs_to_many :users
end
```

#### Group

```ruby
class Group
  has_many :teams, dependent: :destroy
  has_many :contests
  has_many :users, through :group_users
end
```

#### Team

```ruby
class Team
  belongs_to :groups
end
```

#### Event

```ruby
class Event
  belongs_to :users
end
```

#### Contest

```ruby
class Contest
  has_many :contest_announcements, dependent: :destroy
  has_many :submissions, dependent: :destroy
  belongs_to :groups
  has_many :team_contest_ranks
  has_many :acm_contest_ranks
  has_many :oi_contest_ranks
  has_and_belongs_to_many :problems
end
```

#### TeamContestRank

```ruby
class TeamContestRank
  has_many :contests
end
```

#### AcmContestRank

```ruby
class AcmContestRank
  has_many :contests
end
```

#### OiContestRank

```ruby
class OiContestRank
  has_many :contests
end
```

#### ContestAnnouncement

```ruby
class ContestAnnouncement
  belongs_to :contests
end
```

#### ProblemSet

```ruby
class ProblemSet
  has_and_belongs_to_many :problems
end
```

#### Problem

```ruby
class Problem
  has_many :comments, dependent: :destroy
  has_many :submissions, dependent: :destroy
  has_many :solutions, dependent: :destroy
  has__many :users, through :user_problems
  has_and_belongs_to_many :problem_sets
  has_and_belongs_to_many :contests
end
```

#### Comment

```ruby
class Comment
  belongs_to :users
  belongs_to :problems
end
```

#### Solution

```ruby
class Solution
  belongs_to :users
  belongs_to :problems
end
```

#### Tag

```ruby
class Tag
  has_and_belongs_to_many :problems
end
```

#### SubmissionRecord

```ruby
class SubmissionRecord
  
end
```

#### ContributeScore

```ruby
class ContributeScore
  
end
```

#### CostScore

```ruby
class CostScore
  
end
```

### Tables

#### users

|  Attribute   |  Type   | Description |
| :----------: | :-----: | :---------: |
|      id      | integer | primary key |
|     name     | string  |             |
|   password   | string  |             |
|    email     | string  |             |
|     role     | string  |             |
|  true_name   | string  |             |
|     sno      | string  |             |
|    major     | string  |             |
|    motto     | string  |             |
|    score     | integer |             |
| session_keys |  jsonb  |             |
|  created_at  |  date   |             |
|  updated_at  |  date   |             |

#### auth_permissions

| Attribute  |  Type   | Description |
| :--------: | :-----: | :---------: |
|     id     | integer | primary key |
|    name    | string  |             |
|  type_id   | integer |             |
| created_at |  date   |             |
| updated_at |  date   |             |

#### groups

|  Attribute  |  Type   | Description |
| :---------: | :-----: | :---------: |
|     id      | integer | primary key |
|   creater   | string  |             |
|    name     | string  |             |
| description |  test   |             |
| created_at  |  date   |             |
| updated_at  |  date   |             |

#### teams

| Attribute |  Type   | Description |
| :-------: | :-----: | :---------: |
|    id     | integer | primary key |
| group_id  | integer | foreign key |
|   name    | string  |             |
| password  | string  |             |
|   type    | string  |             |
|  member1  |  jsonb  |             |
|  member2  |  jsonb  |             |
|  member3  |  jsonb  |             |

#### events

|  Attribute  |  Type   | Description |
| :---------: | :-----: | :---------: |
|     id      | integer | primary key |
| creater_id  | integer | foreign key |
|    name     | string  |             |
| description |  text   |             |
| created_at  |  date   |             |
| updated_at  |  date   |             |

#### contests

|  Attribute  |   Type   | Description |
| :---------: | :------: | :---------: |
|     id      | integer  | primary key |
|  group_id   | integer  | foreign key |
|   creater   |  string  |             |
|    name     |  string  |             |
| description |   text   |             |
| start_time  | datetime |             |
|  end_time   | datetime |             |
|  rule_type  |  string  |             |
|  password   |  string  |             |
| is_visible  | boolean  |             |
| created_at  |   date   |             |
| updated_at  |   date   |             |

#### team_contest_ranks(joined)

|    Attribute    |  Type   | Description |
| :-------------: | :-----: | :---------: |
|       id        | integer | primary key |
|   contest_id    | integer | foreign key |
|     team_id     | integer | foreign key |
|   submissions   | integer |             |
|     accepts     | integer |             |
|      time       | integer |             |
| submission_info |  jsonb  |             |
|   created_at    |  date   |             |
|   updated_at    |  date   |             |

#### acm_contest_ranks(joined)

|    Attribute    |  Type   | Description |
| :-------------: | :-----: | :---------: |
|       id        | integer | primary key |
|   contest_id    | integer | foreign key |
|     user_id     | integer | foreign key |
|   submissions   | integer |             |
|     accepts     | integer |             |
|      time       | integer |             |
| submission_info |  jsonb  |             |
|   created_at    |  date   |             |
|   updated_at    |  date   |             |

#### oi_contest_ranks(joined)

|    Attribute    |  Type   | Description |
| :-------------: | :-----: | :---------: |
|       id        | integer | primary key |
|   contest_id    | integer | foreign key |
|     user_id     | integer | foreign key |
|   submissions   | integer |             |
|     scores      | integer |             |
| submission_info |  jsonb  |             |
|   created_at    |  date   |             |
|   updated_at    |  date   |             |

#### contest_announcements

|  Attribute  |  Type   | Description |
| :---------: | :-----: | :---------: |
|     id      | integer | primary key |
| contest_id  | integer | foreign key |
|   creater   | string  |             |
|    name     | string  |             |
| description |  text   |             |
|   visible   | boolean |             |
| created_at  |  date   |             |
| updated_at  |  date   |             |

#### problem_sets

|  Attribute  |  Type   | Description |
| :---------: | :-----: | :---------: |
|     id      | integer | primary key |
|  group_id   | integer | foreign key |
|   creater   | string  |             |
|    name     | string  |             |
| description |  text   |             |
| created_at  |  date   |             |
| updated_at  |  date   |             |

#### problems

|     Attribute     |  Type   | Description |
| :---------------: | :-----: | :---------: |
|        id         | integer | primary key |
|      source       | string  |             |
|        vid        | string  |             |
|      creator      | string  |             |
|       name        | string  |             |
|    description    |  text   |             |
|       input       |  text   |             |
|      output       |  text   |             |
|       hint        |  text   |             |
|    time_limit     | integer |             |
|   memory_limit    | integer |             |
|    difficulty     | string  |             |
|       tags        |  jsonb  |             |
|      samples      |  jsonb  |             |
|       data        | string  |             |
|    data_score     |  jsonb  |             |
| allowed_languages |  jsonb  |             |
|        spj        | string  |             |
|     rule_type     | string  |             |
|    is_visible     | boolean |             |
|    submissions    | integer |             |
|      accepts      | integer |             |
|    created_at     |  date   |             |
|    updated_at     |  date   |             |

#### languages

|     Attribute     |  Type   | Description |
| :---------------: | :-----: | :---------: |
|        id         | integer | primary key |
|      source       | string  |             |
| allowed_languages |  jsonb  |             |
|    created_at     |  date   |             |
|    updated_at     |  date   |             |

#### comments

|  Attribute  |  Type   | Description |
| :---------: | :-----: | :---------: |
|     id      | integer | primary key |
|  parent_id  | integer |             |
|    which    | string  |             |
|   creator   | string  |             |
| description | string  |             |
|    likes    |  jsonb  |             |
|  dislikes   |  jsonb  |             |
|   visible   | boolean |             |
| created_at  |  date   |             |
| updated_at  |  date   |             |

#### solutions

|   Attribute    |  Type   | Description |
| :------------: | :-----: | :---------: |
|       id       | integer | primary key |
|   problem_id   | integer | foreign key |
|    user_id     | integer | foreign key |
|  description   |  jsonb  |             |
| subdescription |  jsonb  |             |
|     likes      | integer |             |
|   created_at   |  date   |             |
|   updated_at   |  date   |             |

#### tags

| Attribute  |  Type   | Description |
| :--------: | :-----: | :---------: |
|     id     | integer | primary key |
|    name    | string  |             |
| created_at |  date   |             |
| updated_at |  date   |             |

#### submission

|   Attribute   |   Type   | Description |
| :-----------: | :------: | :---------: |
|      id       | integer  | primary key |
|  contest_id   | integer  | foreign key |
|  problem_id   | integer  | foreign key |
|    user_id    | integer  | foreign key |
|    result     |  string  |             |
|     code      |   text   |             |
| memory_usage  | integer  |             |
|  time_usage   | integer  |             |
| solution_size | integer  |             |
|  created_at   | datetime |             |
|  updated_at   | datetime |             |

#### contribute_scores

| Attribute  |  Type   | Description |
| :--------: | :-----: | :---------: |
|     id     | integer | primary key |
|   action   | string  |             |
|   score    | integer |             |
| created_at |  date   |             |
| updated_at |  date   |             |

#### cost_scores

| Attribute  |  Type   | Description |
| :--------: | :-----: | :---------: |
|     id     | integer | primary key |
|   action   | string  |             |
|   score    | integer |             |
| created_at |  date   |             |
| updated_at |  date   |             |

#### auth_permissions_users(joined)

|     Attribute      |  Type   | Description |
| :----------------: | :-----: | :---------: |
|      user_id       | integer |             |
| auth_permission_id | integer |             |
|     created_at     |  date   |             |
|     updated_at     |  date   |             |

#### group_users(joined)

| Attribute  |  Type   | Description |
| :--------: | :-----: | :---------: |
|     id     | integer | primary key |
|  user_id   | integer | foreign key |
|  group_id  | integer | foreign key |
|    role    | string  |             |
| created_at |  date   |             |
| updated_at |  date   |             |

#### user_problems(joined)

| Attribute  |  Type   | Description |
| :--------: | :-----: | :---------: |
|     id     | integer | primary key |
|  user_id   | integer | foreign key |
| problem_id | integer | foreign key |
|   result   | string  |             |
| created_at |  date   |             |
| updated_at |  date   |             |

#### contest_problems(joined)

|  Attribute  |  Type   | Description |
| :---------: | :-----: | :---------: |
| contest_id  | integer |             |
| problem_id  | integer |             |
| description |  text   |             |
|    input    |  text   |             |
|   output    |  text   |             |
|    hint     |  text   |             |
|   samples   |  jsonb  |             |
| created_at  |  date   |             |
| updated_at  |  date   |             |

#### problems_problem_sets(joined) (name not checked)

|  Type   |   Attribute    | Description |
| :-----: | :------------: | :---------: |
| integer | problem_set_id |             |
| integer |   problem_id   |             |
|  date   |   created_at   |             |
|  date   |   updated_at   |             |

#### problems_tags(joined)

| Attribute  |  Type   | Description |
| :--------: | :-----: | :---------: |
| problem_id | integer |             |
|   tag_id   | integer |             |
| created_at |  date   |             |
| updated_at |  date   |             |
