class CreateRandomStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :random_students do |t|
      t.references :random_list, foreign_key: true
      t.boolean :picked
      t.string :name

      t.timestamps
    end
  end
end
