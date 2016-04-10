Rails.application.routes.draw do

  root to: "static_pages#index"


  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index]
    resources :tasks, only: [:index, :show, :update, :create, :destroy]
    resource  :session, only: [:show, :create, :destroy]
    resources :invites, only: [:create]
    resources :projects, only: [:create, :index, :show]
    resources :comments, only: [:create, :delete]

    get 'tasks/project_tasks/:project_id', to: 'tasks#project_tasks'
    patch 'tasks/reorder/:id', to: 'tasks#reorder'
  end
end
