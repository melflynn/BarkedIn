class creatoreactions < ActiveRecord::Migration[5.2]
  def change
    create_table :reactions do |t|
      t.integer :post_id, null: false, index: true
      t.integer :liker_id, null: false, index: true
      t.string :reaction_type, null: false
      t.timestamps
    end

    add_index :reactions, [:liker_id, :post_id], unique: true
    execute "ALTER TABLE reactions ADD CONSTRAINT type_check CHECK (reaction_type IN ('wag', 'high five', 'throw a bone'))"
  end
end
