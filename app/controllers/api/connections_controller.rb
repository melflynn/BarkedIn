class Api::ConnectionsController < ApplicationController

  def create
    @connection = Connection.new(params.require(:connection).permit(:user_id1, :user_id2))
    if current_user.id == @connection.user_id1
      @connection.status = 'pending_user2'
    elsif current_user.id == @connection.user_id2
      @connection.status = 'pending_user1'
    else
      render json: 'You can only submit connection requests on behalf of yourself', status: 422
      return
    end

    if !@connection.save
      render json: @connection.errors.full_messages, status: 422
    end
  end

  def update
    @connection = Connection.find_by(id: params[:id])
    if current_user.id == @connection.user_id1 && @connection.status == 'pending_user1' || current_user.id == @connection.user_id2 && @connection.status == 'pending_user2'
      if !@connection.update(status: 'connected')
        render json: @connection.errors.full_messages, status: 422
      end
    else
      render json: "Something went wrong", status: 422
    end
  end

  def destroy 
    @connection = Connection.find_by(id: params[:id])
    if current_user.id == @connection.user_id1 || current_user.id == @connection.user_id2
      @connection.destroy
    else
      render json: "You can't delete other people's connections!", status: 422
    end
  end

end
