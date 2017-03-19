class AddHiddenToEvents < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :hidden, :boolean
    add_index :events, :hidden
  end
end
