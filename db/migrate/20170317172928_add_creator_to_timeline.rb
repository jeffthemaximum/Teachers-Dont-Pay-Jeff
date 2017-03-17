class AddCreatorToTimeline < ActiveRecord::Migration[5.0]
  def change
    add_reference :timelines, :user, foreign_key: true
  end
end
