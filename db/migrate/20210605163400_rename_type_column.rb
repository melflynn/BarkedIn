class RenameTypeColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :connections, :type, :status
  end
end
