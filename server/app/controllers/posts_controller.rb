class PostsController < ApplicationController

  before_action :ensure_signed_in
  before_action :load_post, only: [:show, :edit, :update, :destroy]

  def new
    post = Post.new
    render json: post
  end

  def create
      post = Post.new(create_params)
      render json: post
      post.user = current_user


      if post.save
      render plain: 'Post created!'
      redirect_to post_path(@post)
    else
      render :new
    end

  end

  def edit
  end


  def update
    if post.update(update_params)
      render plain: 'Post updated!'
      redirect_to post_path(post)
    else
      render :edit
    end
  end

  def index
    posts = Post.all
    render json: posts
  end

  def show
  end

  def destroy
    post.destroy!

    render plain: " Post #{@post.id} has been deleted!"
    redirect_to posts_path
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