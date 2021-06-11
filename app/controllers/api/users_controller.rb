class Api::UsersController < ApplicationController
  before_action :underscore_params!, only: [:create, :update]

  def create
    @user = User.new(user_params)
    @userOptions = {}
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.messages, status: 422
    end
  end

  def index 
    debugger
    if params[:email]
      @user = User.find_by(email: params[:email])
      render json: @user
    elsif params[:userIds]
      @users = User.find(params[:userIds])
      render :index
    else
      render json: {}
    end
  end

  def show
    @userOptions = params[:userOptions] || {}
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: {userId: 'User with the given id does not exist'}, status: 422
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    @userOptions = {}
    if @user.id == current_user.id
      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    end
  end

  def destroy 
    @user = User.find_by(id: params[:id])
    if @user.id == current_user.id 
      @user.profile_photo.purge
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :country, :region, :breed, :about_me, :profile_photo)
  end

end
