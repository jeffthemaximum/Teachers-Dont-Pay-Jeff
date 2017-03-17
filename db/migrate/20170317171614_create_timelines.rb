class CreateTimelines < ActiveRecord::Migration[5.0]
  def change
    create_table :timelines do |t|
      t.references :user, foreign_key: true
      t.string :title

      t.timestamps
    end
  end
end
