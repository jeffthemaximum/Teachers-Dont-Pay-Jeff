class AddPickedAtToRandomStudents < ActiveRecord::Migration[5.0]
  def change
    add_column :random_students, :picked_at, :datetime
  end
end
