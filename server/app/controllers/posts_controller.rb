class PostsController < ApplicationController

  before_action :ensure_signed_in
  # before_action :load_post, only: [:show, :edit, :update, :destroy]

  def new
    post = Post.new
    render json: post
  end

  def create
      post = Post.new(create_params)
      render json: post
      post.user = current_user
      if post.save
      redirect_to post_path(post)
    else
      render :new
    end

  end

  def edit
  end


  def update
    post = current_user.posts.find(params[:id])
    if post.update(update_params)
      render json: 'Post updated!'
      else
      render json: 'Failed to edit post'
  end
  end

  def index
    posts = Post.all
    render json: posts
  end

  def show
  end

  def myposts
    posts = current_user.posts
    render json: posts
  end


  def destroy
    post = current_user.posts.find(params[:id])
    post.destroy!
  end

  private

  def create_params
    params.require(:post).permit(:description, :image_url)
  end

  def update_params
    params.require(:post).permit(:description, :image_url)
  end

  def load_post
    post = current_user.posts.find(params[:id])
    render json: post
  end
end