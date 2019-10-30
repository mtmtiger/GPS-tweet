class MainsController < ApplicationController
  def index
    session[:root] = "on"
  end

  def top
    if session[:root] == nil
      redirect_to mains_path
    end
  end

  def introduction
  end
end
