class AddFieldsToEvent < ActiveRecord::Migration[5.0]
  def change
    add_column :events, :year, :integer
    add_column :events, :month, :integer
    add_column :events, :day, :integer
    add_column :events, :hour, :integer
    add_column :events, :minute, :integer
    add_column :events, :date, :datetime
  end
end
