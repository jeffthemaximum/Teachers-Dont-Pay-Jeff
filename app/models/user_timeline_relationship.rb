class UserTimelineRelationship < ApplicationRecord
  attr_accessor :user_id, :timeline_id
  belongs_to :user
  belongs_to :timeline
  validates_uniqueness_of :user_id, :scope => :timeline_id
end
