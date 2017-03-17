class AddShareTokenToTimeline < ActiveRecord::Migration[5.0]
  def change
    add_column :timelines, :share_token, :string
  end
end
