class SplitUserLocationAttributes < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :location
    add_column :users, :country, :string
    add_column :users, :region, :string
  end
end
