class MessagesController < ApplicationController

  before_action :ensure_signed_in
  before_action :load_message, only: [:show, :edit, :update, :destroy]

  def new
    message = Message.new
    render json: message
  end

  def create

    message = Message.new(create_params)
    message.user_id = current_user.id

        render: message

    if message.save
      render :plain = 'Message has been saved!'
      redirect_to message_path(message)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if message.update(update_params)
      render :plain = 'Message updated!'
      redirect_to message_path(@message)
    else
      render :edit
    end
  end

  def index
    messages = current_user.messages
    render json: messages
  end

  def show
  end

  def destroy
    message.destroy!

    render :plain = "#{@message.id} was deleted!"
    redirect_to messages_path
  end

  private

  def create_params
    params.require(:message).permit(:description)
  end

  def update_params
    params.require(:message).permit(:description)
  end

  def load_message
    message = current_user.messages.find(params[:id])
    render json: message
  end
end
