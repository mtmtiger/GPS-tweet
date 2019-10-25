Rails.application.routes.draw do
  get 'relationships/create'
  get 'relationships/destroy'
  devise_for :users
  root 'articles#index'
  resources :mains
  resources :signup do
    collection do
      get 'step1'
      get 'step2'
      get 'done'
    end
  end
  resources :articles do
    resources :nices, only: [:create, :destroy]
    member do
      get :map
    end
    collection do
      get :search
    end
  end
  resources :users do
    member do
      get :following
      get :followers
    end
    collection do
      get :sex
      get :age
      get :prefecture
    end
  end
  resources :relationships, only: [:create, :destroy]
end
