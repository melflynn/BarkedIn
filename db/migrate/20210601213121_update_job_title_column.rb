class UpdateJobTitleColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :job_title, :breed
  end
end
