class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :user_timeline_relationships
  has_many :timelines, :through => :user_timeline_relationships do
    def creator
      where('user_timeline_relationships.primary = ?', true)
    end
  end
end
