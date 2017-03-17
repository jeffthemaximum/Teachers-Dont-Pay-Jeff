class AddPrimaryToUserTimelineRelationship < ActiveRecord::Migration[5.0]
  def change
    add_column :user_timeline_relationships, :primary, :boolean
  end
end
