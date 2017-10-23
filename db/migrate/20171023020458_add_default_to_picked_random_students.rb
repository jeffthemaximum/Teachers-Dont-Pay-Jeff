class AddDefaultToPickedRandomStudents < ActiveRecord::Migration[5.0]
  def up
    change_column :random_students, :picked, :boolean, default: false
  end

  def down
    change_column :random_students, :picked, :boolean, default: nil
  end
end
