class AddIndexToShareTokenOnTimeline < ActiveRecord::Migration[5.0]
  def change
    add_index :timelines, :share_token
  end
end
