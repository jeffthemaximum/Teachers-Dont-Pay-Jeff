class Timeline < ApplicationRecord
  has_many :user_timeline_relationships
  has_many :users, :through => :user_timeline_relationships do
    def creator
      where('user_timeline_relationships.primary = ?', true)
    end
  end

  before_create :generate_share_token

  def generate_share_token
    begin
      self.share_token = SecureRandom.base64(4).gsub("/","").gsub(/[=+$]/,"")
    end while Timeline.where("lower(share_token) = lower(?)", self.share_token).exists?
  end
end
