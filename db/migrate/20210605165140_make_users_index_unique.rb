class MakeUsersIndexUnique < ActiveRecord::Migration[5.2]
  def change
    remove_index :connections, [:user_id1, :user_id2]
    add_index :connections, [:user_id1, :user_id2], unique: true
    add_index :connections, :user_id1
    add_index :connections, :user_id2
  end
end
