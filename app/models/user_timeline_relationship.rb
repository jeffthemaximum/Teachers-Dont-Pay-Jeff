# == Schema Information
#
# Table name: user_timeline_relationships
#
#  id          :integer          not null, primary key
#  user_id     :integer
#  timeline_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  primary     :boolean
#

class UserTimelineRelationship < ApplicationRecord
  attr_accessor :user_id, :timeline_id
  belongs_to :user
  belongs_to :timeline
  validates_uniqueness_of :user_id, :scope => :timeline_id
end
