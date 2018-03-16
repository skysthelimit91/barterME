class MessagesController < ApplicationController
    before_action :ensure_signed_in

def index
  messages = Message.all
  render json: messages
 end
def new
 message = Conversation.find(params[:conversation_id]).messages.new
 render json: message
end
def create
 message = Conversation.find(params[:conversation_id]).messages.new(message_params)
 if message.save
  render json: message
 end
end
private
 def message_params
  params.require(:message).permit(:description, :user_id)
 end

 def get_my_convos
  conversations = Conversation.all
end

end