class AddEditTokenToTimeline < ActiveRecord::Migration[5.0]
  def change
    add_column :timelines, :edit_token, :string
    add_index :timelines, :edit_token
  end
end
