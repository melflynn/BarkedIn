class Api::UsersController < ApplicationController
  
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.messages, status: 422
    end
  end

  def index 
    @user = User.find_by(email: params[:email])
    render json: @user
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: {userId: 'User with the given id does not exist'}, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :country, :region, :breed, :about_me, :profile_photo)
  end

end
