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

  def to_hash_with_documents
    event_hash = self.attributes
    documents_array_of_hashes = self.documents.map{|d| d.attributes}
    event_hash['documents'] = documents_array_of_hashes
    return event_hash
  end

  def ampm
    if self.hour < 12
      return "am"
    else
      return "pm"
    end
  end
end
