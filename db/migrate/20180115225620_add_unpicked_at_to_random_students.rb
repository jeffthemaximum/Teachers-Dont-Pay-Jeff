class AddUnpickedAtToRandomStudents < ActiveRecord::Migration[5.0]
  def change
    add_column :random_students, :unpicked_at, :datetime
  end
end
