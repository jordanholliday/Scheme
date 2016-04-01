Rails.application.routes.draw do

  root to: "static_pages#index"

  resources :users, only: [:new, :create, :show]

  namespace :api, defaults: {format: :json} do
    resources :tasks, only: [:index, :show, :update, :create, :destroy]
    resource  :session, only: [:show, :create, :destroy]
  end
  # now handling auth on frontend, sessions nested under API
  # resource :session, only: [:new, :create, :destroy]

end
