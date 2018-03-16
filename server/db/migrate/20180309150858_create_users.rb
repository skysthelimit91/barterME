class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :session_token
      t.string :password_digest
      t.string :image_url, default: "https://www.standardmedia.co.ke/evewoman/assets/img/avatar.jpg"
      t.timestamps
    end
    add_index :users, :username
    add_index :users, :session_token
  end
end


# For help with setting up the relations necessary for my messaging system, I referred to the following resources and guides: https://medium.com/@danamulder/tutorial-create-a-simple-messaging-system-on-rails-d9b94b0fbca1,
#https://www.youtube.com/watch?v=aZjO4lylUJs