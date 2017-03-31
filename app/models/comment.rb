# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  author     :string           default(""), not null
#  text       :text             default(""), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :author, :text, presence: true
  after_commit { CommentRelayJob.perform_later(self) }
end
