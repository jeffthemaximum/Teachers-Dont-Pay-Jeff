class RandomList < ApplicationRecord
  belongs_to :user
  has_many :random_students
end
