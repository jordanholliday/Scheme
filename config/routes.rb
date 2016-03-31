Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  namespace :api, defaults: {format: :json} do
    resources :tasks, only: [:index, :show, :update, :create, :destroy]
  end

  root to: "static_pages#index"
end
