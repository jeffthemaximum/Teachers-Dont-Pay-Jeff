class Event < ApplicationRecord
  belongs_to :timeline

  default_scope { where(hidden: false) }

  def hide!
    self.hidden = true
    self.save!
    return self
  end
end
