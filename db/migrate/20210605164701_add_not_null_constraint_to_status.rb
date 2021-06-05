class AddNotNullConstraintToStatus < ActiveRecord::Migration[5.2]
  def change
    change_column_null :connections, :status, false
  end
end
