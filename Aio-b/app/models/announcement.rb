class ContestAnnouncement < ApplicationRecord
  belongs_to :contests
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
end
