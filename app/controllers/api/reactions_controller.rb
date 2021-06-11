class Api::ReactionsController < ApplicationController

  def create 
    reaction = Reaction.new()
    reaction.liker_id = current_user.id
    reaction.post_id = params[:post_id]
    reaction.reaction_type = params[:reactionType]
    if reaction.save
      render json: reaction
    else
      render json: reaction.errors.full_messages, status: 422
    end
  end

  # def index 
  #   if (params[:postId])
  #     reactions = Reaction.where('post_id = ?', params[:postId])
  #   end
  # end

end
