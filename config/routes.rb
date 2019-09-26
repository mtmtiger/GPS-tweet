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
  resources :articles do
    resources :nices, only: [:create, :destroy]
  end
  resources :users, only: [:index, :show, :update, :destroy]
end
