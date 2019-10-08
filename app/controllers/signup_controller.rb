class SignupController < ApplicationController

  def step1
    @user = User.new
  end

  def step2
    session[:name] = user_params[:name]
    session[:email] = user_params[:email]
    session[:password] = user_params[:password]
    session[:password_confirmation] = user_params[:password_confirmation]
    session[:sex] = user_params[:sex]
    session[:age] = user_params[:age]
    session[:prefecture_id] = user_params[:prefecture_id]
    @user = User.new
  end

  def create
    @user = User.new(
      name: session[:name],
      email: session[:email],
      password: session[:password],
      password_confirmation: session[:password_confirmation],
      sex: session[:sex],
      age: session[:age],
      prefecture_id: session[:prefecture_id],
    )
    if @user.save
      session[:id] = @user.id
      redirect_to done_signup_index_path
    else
      redirect_to step1_signup_index_path
    end

    def done
      @user = User.find(session[:id]) unless user_signed_in?
      sign_in @user
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation,:sex, :age, :prefecture_id)
  end
end
