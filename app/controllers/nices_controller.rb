class NicesController < ApplicationController

  def create
    @nice = current_user.nices.create(article_id: params[:article_id])
    redirect_to root_path
  end

  def destroy
    @nice = Nice.find_by(article_id: params[:article_id], user_id: current_user.id)
    @nice.destroy
    redirect_to root_path
  end
end
