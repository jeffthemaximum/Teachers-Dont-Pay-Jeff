class RemoveUserFromTimeline < ActiveRecord::Migration[5.0]
  def change
    remove_reference(:timelines, :user, index: true)
  end
end
