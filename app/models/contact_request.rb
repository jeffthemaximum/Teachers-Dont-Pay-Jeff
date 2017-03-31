# == Schema Information
#
# Table name: contact_requests
#
#  id         :integer          not null, primary key
#  name       :string
#  email      :string
#  message    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ContactRequest < ApplicationRecord
end
