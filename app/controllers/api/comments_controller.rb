class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new()
    @comment.author_id = current_user.id
    @comment.post_id = params[:post_id]
    @comment.body = params[:body]
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages
    end
  end

  def index
    @comments = Comment.where(post_id: params[:post_id]).order(created_at: :desc).limit(params[:limit]).offset(params[:offset])
    if @comments
      render :index
    else
      render json: @comments.errors.full_messages
    end
  end


end
