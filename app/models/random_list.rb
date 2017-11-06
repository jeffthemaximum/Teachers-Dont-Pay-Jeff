class RandomList < ApplicationRecord
  belongs_to :user
  has_many :random_students

  def unpick_all!
    self.random_students.each do |student|
      student.picked = false
      student.save!
    end
  end
end
