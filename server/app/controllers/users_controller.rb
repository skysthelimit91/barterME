class UsersController < ApplicationController

  before_action :ensure_signed_out, only: [:new, :create]
  before_action :ensure_signed_in, only: [:show, :index]

  def new
    user = User.new
    render json: user
  end

  def create
    user = User.new(create_params)
    render json: user

    if user.save
      sign_in(user)
      flash[:notice] = 'You are signed in!'
      redirect_to users_path
    else
      flash[:error] = user.errors.full_messages.join(', ')
      render :new
    end
  end

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  private

  def create_params
    params.require(:user).permit(:username, :password)
  end
end
