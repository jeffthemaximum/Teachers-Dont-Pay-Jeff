class RandomStudent < ApplicationRecord
  belongs_to :random_list

  def pick!
    self.picked = true
    self.picked_at = DateTime.now
    self.save!
  end

  def unpick!
    self.picked = false
    self.save!
  end
end
