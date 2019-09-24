class ArticlesController < ApplicationController
  before_action :move_to_index, except: :index
  def index
    @article = Article.all.order("created_at ASC")
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    @article.save!
  end

  def show
    @article = Article.all.order("created_at ASC")
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
    params.require(:article).permit(:title, :text, images: []).merge(user_id: current_user.id)
  end
end
