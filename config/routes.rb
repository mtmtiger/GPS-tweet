Rails.application.routes.draw do
  devise_for :users
  root 'articles#index'
  resources :signup do
    collection do
      get 'step1'
      get 'step2'
      get 'done'
    end
  end
  resources :articles
  resources :users, only: [:index, :show, :destroy]
end
