class ArticlesController < ApplicationController
  before_action :move_to_index, except: :index
  def index
    @articles = Article.all.order("created_at DESC").page(params[:page]).per(8)
    @user = User.find(current_user.id) if user_signed_in?
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    @article.update(image_params)
    @article.save!
    redirect_to root_path
  end

  def show
    @article = Article.find(params[:id])
    @nice = Nice.new
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy if @article.id == current_user.id
  end


  private

  def move_to_index
    redirect_to root_path unless user_signed_in?
  end

  def article_params
    params.require(:article).permit(:title, :text, :address, :lat, :lng).merge(user_id: current_user.id)
  end

  def image_params
    params.require(:new_images).permit(images: [])
  end
  
  def num_params
    params.require(:new_images).permit(num: [])
  end
end
