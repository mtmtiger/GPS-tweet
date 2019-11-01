class ArticlesController < ApplicationController
  # before_action :move_to_index, except: [:index, :show, :map, :search]
  def index
    @articles = Article.all.order("created_at DESC").page(params[:page]).per(8)
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)
    @article.update(image_params)
    @article.save!
    redirect_to articles_path
  end

  def show
    @article = Article.find(params[:id])
    @nice = Nice.new
  end

  def edit
    @article = Article.find(params[:id])
    gon.article = @article
    gon.lat = @article.lat.to_f
    gon.lng = @article.lng.to_f
    img_array = []
    @article.images.each do |image|
      img_array.push(image)
    end
    gon.img_array = img_array
  end

  def update
    @article = Article.find(params[:id])
    if num_params[:num] != nil
      num_params[:num].each do |n|
        n = n.to_i
        @article.images[n].purge
      end
    end
    if image_params[:images] != nil
      @article.update(image_params)
    end
    @article.update(article_params)
    redirect_to article_path
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy if @article.user_id == current_user.id
    redirect_to articles_path
  end

  def map
    @article = Article.find(params[:id])
    gon.lat = @article.lat.to_f
    gon.lng = @article.lng.to_f
  end

  def search
    if params[:keyword] != ""
      @search_articles = Article.all.where('title LIKE ?', "%#{params[:keyword]}%").order("created_at DESC").limit(8)
    else
      @search_articles = @articles = Article.all.order("created_at DESC").page(request.referer[-1].to_i).per(8)
    end
    respond_to do |format|
      format.json
    end
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
