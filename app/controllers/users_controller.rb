class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(image_params) if @user.id == current_user.id
    redirect_to user_path(@user.id)
  end

  private

  def image_params
    params.require(:user).permit(:image)
  end
end