class CreateUserTimelineRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :user_timeline_relationships do |t|
      t.integer :user_id
      t.integer :timeline_id

      t.timestamps
    end
  end
end
