class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.integer :post_id, null: false, index: true
      t.integer :author_id, null: false, index: true
      t.integer :parent_comment_id, index: true
      t.text :body, null: false
      t.timestamps
    end
  end
end
