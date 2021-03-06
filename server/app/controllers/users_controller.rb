class UsersController < ApplicationController
  def index
    puts 'called'
    session[:session_token] = 3
    render json: [1, 2, 3, 4]
  end

  def gen_token(user_id)
    payload = {id: user_id}
    JWT.encode(payload, Rails.application.secrets.secret_key_base) 
  end

  def create
    username = params[:username]
    password = params[:password]
    image_url = params[:image_url]


    new_user = User.create({
      password: password,
      username: username
    })


    if new_user
      render json: {token: gen_token(new_user.id)}
    else
      render json: {err: 'nope'}
    end
  end

  def index
    users = User.all
    render json: users
  end

  def is_logged_in
    if current_user
      render json: current_user
    else render nothing: true, status: 401
    end
  end

  def current
    user = current_user
    render json: user
  end

  def update
    user = current_user
    if user.update(update_params)
      render json: 'User pic updated!'
    else
      render json: 'Failed to edit pic'
  end
end

  def login
    username = params[:username]
    password = params[:password]

    user = User.find_from_credentials username, password
    if user.nil?
      render json: { err: 'No User' }
    else 
      render json: {user: user, token: gen_token(user.id)}
    end
  end
  def update_params
    params.require(:user).permit(:image_url)
  end
end

