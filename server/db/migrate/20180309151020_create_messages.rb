class CreateMessages < ActiveRecord::Migration[5.1]
 def change
  create_table :messages do |t|
   t.text :description
   t.references :conversation, index: true
   t.references :user, index: true
   t.boolean :read, :default => false
   t.timestamps
  end
 end
end

# For help with setting up the relations necessary for my messaging system, I referred to the following resources and guides: https://medium.com/@danamulder/tutorial-create-a-simple-messaging-system-on-rails-d9b94b0fbca1,
#https://www.youtube.com/watch?v=aZjO4lylUJs