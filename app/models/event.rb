# == Schema Information
#
# Table name: events
#
#  id          :integer          not null, primary key
#  title       :string
#  description :string
#  timeline_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  year        :integer
#  month       :integer
#  day         :integer
#  hour        :integer
#  minute      :integer
#  date        :datetime
#  hidden      :boolean          default(FALSE)
#  document_id :integer
#

class Event < ApplicationRecord
  belongs_to :timeline

  has_many :documents

  default_scope { where(hidden: false) }

  def hide!
    self.hidden = true
    self.save!
    return self
  end
end
