class Timeline < ApplicationRecord
  has_many :user_timeline_relationships
  has_many :users, :through => :user_timeline_relationships do
    def creator
      where('user_timeline_relationships.primary = ?', true)
    end
  end
end
