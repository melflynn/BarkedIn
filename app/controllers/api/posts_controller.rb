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

  def update

  end

  def destroy
  
  end
end
