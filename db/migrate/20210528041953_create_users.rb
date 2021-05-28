class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name, null: false, index: true
      t.string :last_name, null: false, index: true
      t.string :email, null: false, index: {unique: true}
      t.string :job_title
      t.string :location
      t.text :about_me
      t.string :password_digest, null: false
      t.string :session_token, null: false, index: true
      t.timestamps
    end

    add_index :users, [:first_name, :last_name]
  end
end
