class CreatePosts < ActiveRecord::Migration[5.1]
  def change
    create_table :posts do |t|
      t.text :description
      t.string :image_url
      t.belongs_to :user, index: true
      t.timestamps
    end
  end
end
