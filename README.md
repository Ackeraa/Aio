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
*  2023.12.9 修复user setting，将数据库表结构复制到readme，重新梳理数据库
*  2023.12.10 继续优化数据库表结构
*  2023.12.11-12.18 摆
*  2023.12.19 绘制关系图

## TODO
* [ ] delete source of comments

* [ ] Fix User Module

* [ ] Fix Group Module
* [ ] Fix Problem Module
* [ ] Fix Contest Module
* [ ] Fix ProblemSet Module
* [ ] Fix Comment Module
* [ ] Fork 
* [ ] Add AI
* [ ] cache joined group..
* [ ] Thread pool
* [ ] 前端完成：完善user部分、完善group部分、完善contest部分、完善discuss部分、完善message部分、完善problem部分
* [ ] 后端完成
* [ ] 爬虫服务
* [ ] 评测服务
* [ ] 监控服务
* [ ] k8s
* [ ] 

## Design

* contest归属于某个group，group_id为0表示公开的竞赛
* submission中的contest_id为0表示在非竞赛下提交

## Technic

### framework

* MVC: Modle-View-Controller
* ORM: Object-Relational Mapping
* DOM: Document Object Model
* rails modules:
  * Active Record: tables map to classes, rows to objects, and columns to object attributes
  * Active Job:  a generic framework for running code in the background
  * Active Storage: store data
  * Action Pack: views and controllers are bundled into a single componen
  * Action Cable: provides both a client-side JavaScript framework and a server-side Ruby framework
  * Action Mailer: sending emails
  * Action Mailbox: receive emails
  * Action Text: rich-text editing system
  * MiniTes: unit test framework preinstalled with Ruby
* codemirror
* 

### ruby

```ruby
ng config cli.packageManager cnpm 
# regular expression.
\pattern\ 
%r{pattern} 

# blocks.
animals = %w( ant bee cat dog elk )
animals.each{|animal| puts animal}

3.times{print "hello"}

# & capture a passed block as a named parameter.
def wrap &b
  3.times(&b)
end
wrap{print "hello"}

# Exceptions.
begin
  content = load_blog_data(file_name)
rescue BlogDataNotFound
  STDERR.puts "File #{file_name} not found"
end

# Idioms.
count ||= 0 # gives count the value 0 if count is nil or false.
creat! # ! means change.

```

### rails

```ruby
#### console ###

# after a new migration (rake db:migrate).
reload! 

# not show sql sequence.
ActiveRecord::Base.logger= nil 

# save to DB.
rake db:seed 

# database console.
rails dbconsole 

# unit test.
rails test:models

# system test.
rails test:system

# turn on cache
rails dev:cache

# clear logs of test
rails log:clear LOGS=test

# webpacker rerun
rails webpacker:compile

# emails
rails generate mailer Order received shipped

# active job
rails generate job charge_order

# reset id
ActiveRecord::Base.connection.reset_pk_sequence!('table_name')

```

```ruby
### code ###

# in config/environments/development.rb add this to allow access in deployment
config.action_cable.disable_request_forgery_protection = true

# donot put passwd into log
config.filter_parameters += [ :credit_card_number ]

# config lib
config.autoload_paths += %W(#{Rails.root}/lib)

# return a list of all the files in cwd
@files = Dir.glob('*') 

# build new line item relationship between the @cart object and the product.
@cart.line_items.build(product: product)

# display error message
puts @product.errors.full_messages

# add log.
logger.error "Attempt to access invalid cart #{params[:id]}"

# display the first n characters.
truncate() 

# remove the HTML tags.
trip_tags() 

# display HTML style.
sanitize()

# case generates the order or orders string
pluralize()

# button link
button_to

# generates an HTML <img> tag using its argument as the image source.
image_tag()

# generates a <link> tag, speed up page changes within an application.
stylesheet_link_tag()

# generates a <script> to load scripts.
javascript_pack_tag()

# sets up all the behind-the-scenes data needed to prevent cross-site request forgery attacks.
csrf_meta_tags()

# redirect
line_items_path(:product_id)

# skip before action
skip_before_action()

# format number
number_to_currency()

# confirm dialog.
data: { confirm: 'Are you sure?' } 

# validations.
validates :title, uniqueness: true
validates :title, :description, :image_url, presence: true
validates :price, numericality: { greater_than_or_equal_to: 0.01 }
validates :image_url, allow_blank: true, format: 
				{ with: %r{\.(gif|jpg|png)\z}i,
					message: 'must be a URL for GIF, JPG or PNG image.'
				}

# change root, store_index: tells Rails to create 
# store_index_path and store_index_url accessor methods.
root 'store#index', as: 'store_index' 

# cache
# <% cache @product do %>
#something
#<% end %>
  
# before action
before_action :set_cart, only: [:create]

# before destroy.
before destroy :some_thing

# converts Ruby string into a format acceptable as input to JavaScript.
j()

# broadcast by ActionCable
ActionCable.server.broadcast 'products',
html: render_to_string('store/index', layout: false)

```

```ruby
### routing ###

# routing concerns.
concern :reviewable do 
  resources :reviews
end
resources :products, concern: :reviewable 
resources :users, concern: :reviewable

# shallow route nesting.
resources :products, shallow: true do 
  resources :reviews
end

# redirect.
redirect_to action: "display"
redirect_to("/help/order_entry.html")
redirect_to(:back)

# session
# if store model objects in a session, must add model declarations for them.

# flash
flash.now
flash.keep
```



```ruby
### unit test ###

rails test:models

assert
assert_equal
assert_match
assert_select
assert_response
assert_difference
assert_redirected_to
assert_no_selector
assert_selector

errors()
invalid?()
any?()

assert product.invalid?
assert product.errors[:title].any?

assert product.invalid?
assert_equal ["must be greater than or equal to 0.01"], 
	product.errors[:price]

# redirect.
follow_redirect!

# in the expected results, instead of a redirect.
xhr 

ok.each do |image_url|
	assert new_product(image_url).valid?,
end

# fixture is a specification of the initial contents of a model.
class ProductTest < ActiveSupport::TestCase 
  fixtures :products # control which fixtures to load.
#...
end

test "product is not valid without a unique title" do 
  product = Product.new(title: products(:ruby).title,
    description: "yyy", price: 1, image_url: "fred.gif")
  assert product.invalid?
  assert_equal ["has already been taken"], product.errors[:title]
end

# debuge.
# <h4>Session</h4> <%= debug(session) %> 
# <h4>Params</h4> <%= debug(params) %> 
# <h4>Response</h4> <%= debug(response) %>

### system test ###

# edit test/application_system_test_case.rb
require "test_helper"
class ApplicationSystemTestCase < ActionDispatch::SystemTestCase 
  driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400]
end


visit
click_on
fill_in ' ', with: ' '
```

### database

```sqlite
/x on
EXPLAIN ANALYZE

.haders on
.mode columns 
.schema %people%
.quit
```

```ruby
# before type cast.
Order.first.pay_type_before_type_cast

user = User.find_by(name: "Dave") 
if user.superuser?
  grant_privileges
end

# set primary key.
class LegacyBook < ApplicationRecord 
  self.primary_key = "isbn"
end

# create.
orders = Order.create(
	[{ name: "Dave Thomas",
		 email: "dave@example.com", 
     address: "123 Main St", 
      pay_type: "check"
    },
	{ name: "Andy Hunt",
    email: "andy@example.com", 
    address: "456 Gentle Drive", 
    pay_type: "po"
   }])

# read.
pos = Order.where(["name = ? and pay_type = 'po'", name])
pos = Order.where(name: params[:name], pay_type: params[:pay_type])
User.where("name like ?", params[:name]+"%")
orders = Order.where(name: 'Dave'). order("pay_type, shipped_at DESC")
orders = Order.where(name: 'Dave'). order("pay_type, shipped_at DESC"). limit(10)
def Order.find_on_page(page_num, page_size)
  order(:id).limit(page_size).offset(page_num*page_size)
end
list = Talk.select("title, speaker, recorded_on")
summary = LineItem.select("sku, sum(amount) as amount").group("sku")

# transaction.
Account.transaction do
  ac = Account.where(id: id).lock("LOCK IN SHARE MODE").first 
  ac.balance -= amount if ac.balance > amount
  ac.save
end

average = Product.average(:price) # average product price max = Product.maximum(:price)
min = Product.minimum(:price)
total = Product.sum(:price)
number = Product.count
Order.where("amount > 20").minimum(:amount)
result = Order.group(:state).maximum(:amount)

# scope.
class Order < ApplicationRecord
	scope :last_n_days, ->(days) { where('updated < ?' , days) }
end

# update.
order = Order.find(123) 
order.name = "Fred" 
order.save

result = Product.update_all("price = 1.1*price", "title like '%Java%'")

# • save returns true if the record was saved; it returns nil otherwise.
# • save! returns true if the save succeeded; it raises an exception otherwise.
# • create returns the Active Record object regardless of whether it was suc- cessfully saved.  
#   You’ll need to check the object for validation errors if you want to determine whether the 
#   data was written.
# • create! returns the Active Record object on success; it raises an exception otherwise.
# We have to define an empty placeholder to get after_find pro- cessing to take place.

# delete.
Order.delete(123)
User.delete([2,3,4,5])
Product.delete_all(["price > ?", @expensive_price])

order = Order.find_by(name: "Dave") 
order.destroy
Order.destroy_all(["shipped_at < ?", 30.days.ago])

# callbacks.
class CreditCardCallbacks
  # Normalize the credit card number
  def before_validation(model) 
    model.cc_number.gsub!(/[-\s]/, '')
  end 
end
class Order < ApplicationRecord 
  before_validation CreditCardCallbacks.new 
  # ...
end

# Do the same after finding an existing record.
alias_method :after_find, :after_save

```



```ruby
force:true
# One-to-Many.
class Person < ActiveRecord::Base
  has_one :personal_info, dependent: :destroy
  has_many :jobs
  has_many :my_jobs, class_name: "Job"
end

class Job < ActiveRecord::Base
  belongs_to :person
end
```

```ruby
# Many-to-Many.
rails g migration create_hobbies_people person:references, hobby:references

class Person < ActiveRecord::Base
  has_one :personal_info, dependent: :destroy
  has_many :jobs
  has_many :my_jobs, class_name: "Job"
  has_and_belongs_to_many :hobbies
end

class Hobby < ActiveRecord::Base
  has_and_belongs_to_many :people
end

```

```ruby
# Rich Many-to-Many.
class Person < ActiveRecord::Base
  has_one :personal_info, dependent: :destroy
  has_many :jobs
  has_many :my_jobs, class_name: "Job"
  has_and_belongs_to_many :hobbies
  has_many :approx_salaries, through :jobs, source :salary_range
  
  def max_salary
    approx_salaries.maximum(:max_salary)
  end
end

class Job < ActiveRecord::Base
  belongs_to :person
  has_one :salary_range
end

class SalaryRange < ActiveRecord::Base
  belongs_to :job
end
```

## Database

### Relation

* User
  * has may: 
    * created problems
    * submited problems
    * created groups
    * joined groups
    * created contests
    * joined contests
    * submissions
    * acm_contest_ranks
    * oi_contest_ranks
    * solutions
    * problem_sets
    * comments
    * announcements
* Group
  * belongs to:
    * creator
  * has many:
    * contests
    * problems
    * problem_sets
    * members
    * teams??
* Problem
  * belongs to: 
    * creator
  * has many: 
    * submitters
    * comments
    * submissions
    * solutions
  * has and belongs to many
    * contests
    * problem_sets
    * tags
* Contest
  * belongs to:
    * creator
    * group
  * has many:
    * participants
    * submissions
    * announcements
    * comments
  * has and belongs to many
    * problems
* ProblemSet
  * belongs to:
    * creator
    * group
  * has many:
    * comments
  * has and belongs to many:
    * problems
* Submission
  * belongs to:
    * submitter
    * contest
    * problem
* Comment
  * belongs to:
    * creator
    * commentable
* Solution
  * belongs to:
    * creator
    * problem
    * contest

* Announcement
  * belongs to:
    * creator
    * contest

* GroupMember
  * belongs to:
    * user
    * group

* ProblemRecord
  * belongs to:
    * user
    * problem

* ContestRecord
  * belongs to:
    * user
    * contest
* Tag
  * has and belongs to many:
    * problems

* Team
  * belongs to:
    * group

* Language
* ContributeScore
* CostScore
* Event

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

|       Attribute        |   Type   |   Description    |
| :--------------------: | :------: | :--------------: |
|           id           |  bigint  |   primary key    |
|          uid           |  string  |                  |
|          name          |  string  |                  |
|        password        |  string  |                  |
|   encrypted_password   |  string  |                  |
|         email          |  string  |                  |
|          role          |  string  |                  |
|       real_name        |  string  |                  |
|          sno           |  string  |                  |
|         major          |  string  |                  |
|         motto          |  string  |                  |
|         photo          |  string  |                  |
|         school         |  string  |                  |
|         github         |  string  |                  |
|       followers        |  jsonb   |                  |
|       following        |  jsonb   |                  |
|         score          | integer  |                  |
|      oj_accounts       |  jsonb   |                  |
|         tokens         |  string  |                  |
|  reset_password_token  |  string  |                  |
| reset_password_sent_at | datetime |                  |
| allow_password_change  | boolean  |                  |
|  remember_created_at   | datetime |                  |
|   confirmation_token   |  string  |                  |
|      confirmed_at      | datetime |                  |
|  confirmation_sent_at  | datetime |                  |
|   unconfirmed_email    |  string  |                  |
|     sign_in_count      | integer  |                  |
|   current_sign_in_at   | datetime |                  |
|    last_sign_in_at     | datetime |                  |
|   current_sign_in_ip   |   inet   |                  |
|    last_sign_in_ip     |   inet   |                  |
|        provider        |  string  | default: "email" |
|       created_at       | datetime |                  |
|       updated_at       | datetime |                  |

#### groups

|  Attribute  |   Type   |  Description   |
| :---------: | :------: | :------------: |
|     id      |  bigint  |  primary key   |
| creater_id  |  bigint  |                |
|    name     |  string  |                |
| description |   text   |                |
|    photo    |  string  |                |
| is_visible  | boolean  | default: false |
| created_at  | datetime |                |
| updated_at  | datetime |                |

#### contests

|  Attribute  |   Type   | Description |
| :---------: | :------: | :---------: |
|     id      |  bigint  | primary key |
|  group_id   |  bigint  | foreign key |
| creater_id  |  bigint  | foreign key |
|    name     |  string  |             |
| description |   text   |             |
| start_time  | datetime |             |
|  end_time   | datetime |             |
|  rule_type  |  string  |             |
|  password   |  string  |             |
| is_visible  | boolean  |             |
| created_at  | datetime |             |
| updated_at  | datetime |             |

#### problem_sets

|  Attribute  |   Type   | Description |
| :---------: | :------: | :---------: |
|     id      |  bigint  | primary key |
|  group_id   |  bigint  | foreign key |
| creater_id  |  bigint  | foreign key |
|    name     |  string  |             |
| description |   text   |             |
| created_at  | datetime |             |
| updated_at  | datetime |             |

#### problems

|     Attribute     |   Type   | Description |
| :---------------: | :------: | :---------: |
|        id         |  bigint  | primary key |
|    creator_id     |  bigint  | foreign key |
|      source       |  string  |             |
|        vid        |  string  |             |
|       token       |  string  |             |
|       name        |  string  |             |
|    description    |   text   |             |
|       input       |   text   |             |
|      output       |   text   |             |
|       hint        |   text   |             |
|    time_limit     | integer  |             |
|   memory_limit    | integer  |             |
|    difficulty     |  string  |             |
|       tags        |  jsonb   |             |
|      samples      |  jsonb   |             |
|       data        |  string  |             |
|    data_score     |  jsonb   |             |
| allowed_languages |  jsonb   |             |
|     template      |  string  |             |
|        spj        |  string  |             |
|     rule_type     |  string  |             |
|    is_visible     | boolean  |             |
|    submissions    | integer  |             |
|      accepts      | integer  |             |
|    created_at     | datetime |             |
|    updated_at     | datetime |             |

#### group_members

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
|  user_id   | integer  | foreign key |
|  group_id  | integer  | foreign key |
|    role    |  string  |             |
| created_at | datetime |             |
| updated_at | datetime |             |

#### problem_records

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
|  user_id   | integer  | foreign key |
| problem_id | integer  | foreign key |
|   score    | integer  |             |
|   result   |  string  |             |
| created_at | datetime |             |
| updated_at | datetime |             |

#### contest_records

|    Attribute    |   Type   | Description |
| :-------------: | :------: | :---------: |
|       id        |  bigint  | primary key |
|   contest_id    | integer  | foreign key |
|     user_id     | integer  | foreign key |
| submission_info |  jsonb   |             |
|   created_at    | datetime |             |
|   updated_at    | datetime |             |

#### submission

|  Attribute   |   Type   | Description |
| :----------: | :------: | :---------: |
|      id      |  bigint  | primary key |
|  contest_id  |  bigint  | foreign key |
|  problem_id  |  bigint  | foreign key |
| submitter_id |  bigint  | foreign key |
|   results    |  jsonb   |             |
|     code     |   text   |             |
|  created_at  | datetime |             |
|  updated_at  | datetime |             |

#### announcements

|  Attribute  |   Type   |  Description   |
| :---------: | :------: | :------------: |
|     id      |  bigint  |  primary key   |
| contest_id  |  bigint  |  foreign key   |
| creater_id  |  bigint  |  foreign key   |
|    name     |  string  |                |
| description |   text   |                |
|   visible   | boolean  | default: false |
| created_at  | datetime |                |
| updated_at  | datetime |                |

#### teams

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
|  group_id  |  bigint  | foreign key |
|    name    |  string  |             |
|  password  |  string  |             |
|    type    |  string  |             |
|  member1   |  jsonb   |             |
|  member2   |  jsonb   |             |
|  member3   |  jsonb   |             |
| created_at | datetime |             |
| updated_at | datetime |             |

#### comments

|    Attribute     |   Type   |             Description             |
| :--------------: | :------: | :---------------------------------: |
|        id        |  bigint  |             primary key             |
|    creator_id    |  bigint  |             foreign key             |
|    parent_id     |  bigint  |                                     |
|      source      |  string  |                                     |
|   description    |   text   |                                     |
|      likes       |  jsonb   | default: {"votes"=>0, "voters"=>[]} |
|     dislikes     |  jsonb   | default: {"votes"=>0, "voters"=>[]} |
|     visible      | boolean  |                                     |
| commentable_type |  string  |                                     |
|  commentable_id  | integer  |                                     |
|    created_at    | datetime |                                     |
|    updated_at    | datetime |                                     |

#### solutions

|   Attribute    |   Type   | Description |
| :------------: | :------: | :---------: |
|       id       |  bigint  | primary key |
|   problem_id   |  bigint  | foreign key |
|   creator_id   |  bigint  | foreign key |
|  description   |  jsonb   |             |
| subdescription |  jsonb   |             |
|     likes      | integer  |             |
|   created_at   | datetime |             |
|   updated_at   | datetime |             |

#### languages

|     Attribute     |   Type   | Description |
| :---------------: | :------: | :---------: |
|        id         |  bigint  | primary key |
|      source       |  string  |             |
| allowed_languages |  jsonb   |             |
|    created_at     | datetime |             |
|    updated_at     | datetime |             |

#### tags

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
|    name    |  string  |             |
| created_at | datetime |             |
| updated_at | datetime |             |

#### events

|  Attribute  |   Type   | Description |
| :---------: | :------: | :---------: |
|     id      |  bigint  | primary key |
|   user_id   |  bigint  | foreign key |
|    name     |  string  |             |
| description |   text   |             |
| created_at  | datetime |             |
| updated_at  | datetime |             |

#### contribute_scores

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
|   action   |  string  |             |
|   score    | integer  |             |
| created_at | datetime |             |
| updated_at | datetime |             |

#### cost_scores

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
|   action   |  string  |             |
|   score    | integer  |             |
| created_at | datetime |             |
| updated_at | datetime |             |

#### auth_permissions

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
|    name    |  string  |             |
|  type_id   | integer  |             |
| created_at | datetime |             |
| updated_at | datetime |             |

#### auth_permissions_users(joined)

|     Attribute      |   Type   | Description |
| :----------------: | :------: | :---------: |
|         id         |  bigint  | primary key |
|      user_id       | integer  | foreign key |
| auth_permission_id | integer  | foreign key |
|     created_at     | datetime |             |
|     updated_at     | datetime |             |

#### contests_problems(joined)

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
| contest_id |  bigint  | foreign key |
| problem_id |  bigint  | foreign key |
| created_at | datetime |             |
| updated_at | datetime |             |

#### problems_problem_sets(joined) 

|   Attribute    |   Type   | Description |
| :------------: | :------: | :---------: |
|       id       |  bigint  | primary key |
| problem_set_id |  bigint  | foreign key |
|   problem_id   |  bigint  | foreign key |
|   created_at   | datetime |             |
|   updated_at   | datetime |             |

#### problems_tags(joined)

| Attribute  |   Type   | Description |
| :--------: | :------: | :---------: |
|     id     |  bigint  | primary key |
| problem_id |  bigint  | foreign key |
|   tag_id   |  bigint  | foreign key |
| created_at | datetime |             |
| updated_at | datetime |             |
