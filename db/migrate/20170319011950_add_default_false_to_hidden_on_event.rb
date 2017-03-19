class AddDefaultFalseToHiddenOnEvent < ActiveRecord::Migration[5.0]
  def change
    change_column :events, :hidden, :boolean, :default => false
  end
end
