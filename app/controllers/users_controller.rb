class UsersController < ApplicationController

  def index
    @users = User.all.page(params[:page]).per(6)
  end

  def show
    @user = User.find(params[:id])
    @articles_count = @user.articles
    @articles = @user.articles.page(params[:page]).per(5)
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    @user.update(image_params) if @user.id == current_user.id
    redirect_to user_path(@user.id)
  end

  def destroy
    sign_out @user
    redirect_to root_path
  end

  def following
    @user = User.find(params[:id])
    @users = @user.following
    render 'show_follow'
  end

  def followers
    @user = User.find(params[:id])
    @users = @user.followers
    render 'show_follower'
  end

  def sex
    @users = User.where(sex: params[:sex]).page(params[:page]).per(6)
    @users.each do |user|
      @user = user.sex
    end
  end
  
  def age
    @users = User.where(age: params[:age]).page(params[:page]).per(6)
    @users.each do |user|
      @user = user.age
    end
  end

  def prefecture
    @users = User.where(prefecture_id: params[:prefecture]).page(params[:page]).per(6)
    @users.each do |user|
      @user = user.prefecture.name
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :sex, :age, :prefecture_id, :profile)
  end

  def image_params
    params.require(:user).permit(:image)
  end

end