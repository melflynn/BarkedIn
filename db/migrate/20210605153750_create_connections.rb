class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.integer :user_id1, null: false
      t.integer :user_id2, null: false
      t.string :type, inclusion: ['pending_user1', 'pending_user2', 'connected']
      t.timestamps
    end

    add_index :connections, [:user_id1, :user_id2]
    execute 'ALTER TABLE connections ADD CONSTRAINT connected_check CHECK (user_id1 < user_id2)'
  end
end
