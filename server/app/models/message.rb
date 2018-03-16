class Message < ApplicationRecord
 belongs_to :conversation
 belongs_to :user
 validates_presence_of :description, :conversation_id, :user_id
end




# For help with setting up the relations necessary for my messaging system, I referred to the following resources and guides: https://medium.com/@danamulder/tutorial-create-a-simple-messaging-system-on-rails-d9b94b0fbca1,
#https://www.youtube.com/watch?v=aZjO4lylUJs