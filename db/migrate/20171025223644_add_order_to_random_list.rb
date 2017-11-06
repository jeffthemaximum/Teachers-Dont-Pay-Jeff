class AddOrderToRandomList < ActiveRecord::Migration[5.0]
  def change
    add_column :random_lists, :order, :jsonb, default: []
  end
end
