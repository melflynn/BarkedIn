class Api::PostsController < ApplicationController

  def create
    @post = Post.new(body: params[:body])
    @post.author_id = current_user.id
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def index 
    if (params[:postIds] && !params[:postIds].empty?)
      posts = Post.where('id IN (?)',params[:postIds]).order(updated_at: :desc)
      render json: posts
    else
      render json: []
    end
  end

  def show
    @post = Post.find_by(id: params[:id])
    if @post 
      render :show
    else
      render json: {postId: 'a post with that id does not exist'}, status: 422
    end
  end

  def update
    @post = Post.find_by(id: params[:id])
    if @post.author_id == current_user.id
      if @post.update(post_params)
        render :show
      else
        render json: @post.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    post = Post.find_by(id: params[:id])
    if post.author_id == current_user.id
      post.destroy
      render json: post
    else
      render json: "You can't delete someone else's post", status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:body)
  end
end
