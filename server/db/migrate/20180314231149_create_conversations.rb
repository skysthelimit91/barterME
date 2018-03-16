class CreateConversations < ActiveRecord::Migration[5.1]
  def change
  create_table :conversations do |t|
   t.integer :sender_id
   t.integer :recipient_id
   t.timestamps
  end
 end
end



# For help with setting up the relations necessary for my messaging system, I referred to the following resources and guides: https://medium.com/@danamulder/tutorial-create-a-simple-messaging-system-on-rails-d9b94b0fbca1,
#https://www.youtube.com/watch?v=aZjO4lylUJs