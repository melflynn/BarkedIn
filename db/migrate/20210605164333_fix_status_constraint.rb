class FixStatusConstraint < ActiveRecord::Migration[5.2]
  def change
    remove_column :connections, :status
    add_column :connections, :status, :string

    execute "ALTER TABLE connections ADD CONSTRAINT status_check CHECK (status IN ('pending_user1', 'pending_user2', 'connected'))"
  end
end
