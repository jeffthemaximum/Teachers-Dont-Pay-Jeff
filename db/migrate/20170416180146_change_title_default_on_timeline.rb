class ChangeTitleDefaultOnTimeline < ActiveRecord::Migration[5.0]
  def change
    change_column_default :timelines, :title, from: nil, to: "My Timeline"
    Timeline.all.each do |timeline|
      timeline.update_attributes(:title => "My Timeline")
    end
  end
end
