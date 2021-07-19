class Api::ReactionsController < ApplicationController

  def index 
    @reaction = Reaction.find_by(post_id: params[:post_id], liker_id: current_user.id)
    if @reaction 
      render :show
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def create 
    @reaction = Reaction.new()
    @reaction.liker_id = current_user.id
    @reaction.post_id = params[:post_id]
    @reaction.reaction_type = params[:reactionType]
    if @reaction.save
      render :show
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def update 
    @reaction = Reaction.find_by(liker_id: current_user.id, post_id: params[:post_id])
    if @reaction 
      @reaction.update({id: @reaction.id, reaction_type: params[:reactionType]})
      render :show
    else
      render json: @reaction.errors.full_messages, status: 422
    end
  end

  def destroy 
    reaction = Reaction.find_by(id: params[:id])
    if reaction
      reaction.destroy
    else
      render json: "reaction does not exit", status: 422
  end

  # def index 
  #   if (params[:postId])
  #     reactions = Reaction.where('post_id = ?', params[:postId])
  #   end
  # end

end
