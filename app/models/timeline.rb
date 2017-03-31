# == Schema Information
#
# Table name: timelines
#
#  id          :integer          not null, primary key
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  share_token :string
#  edit_token  :string
#

class Timeline < ApplicationRecord
  has_many :user_timeline_relationships
  has_many :events
  has_many :users, :through => :user_timeline_relationships do
    def creator
      where('user_timeline_relationships.primary = ?', true)
    end
  end

  before_create :generate_share_token
  before_create :generate_edit_token

  def generate_share_token
    begin
      self.share_token = SecureRandom.base64(4).gsub("/","").gsub(/[=+$]/,"")
    end while Timeline.where("lower(share_token) = lower(?)", self.share_token).exists?
  end

  def generate_edit_token
    begin
      self.edit_token = SecureRandom.base64(5).gsub("/","").gsub(/[=+$]/,"")
    end while Timeline.where("lower(edit_token) = lower(?)", self.edit_token).exists?
  end
end
