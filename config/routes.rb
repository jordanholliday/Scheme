Rails.application.routes.draw do

  root to: "static_pages#index"


  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index]
    resources :tasks, only: [:index, :show, :update, :create, :destroy]
    resource  :session, only: [:show, :create, :destroy]
    resources :invites, only: [:create]
    resources :projects, only: [:create, :index, :show]

    get 'tasks/project_tasks/:project_id', to: 'tasks#project_tasks'
    get 'tasks/reorder/:task_id', to: 'tasks#reorder'
  end
  # now handling auth on frontend, sessions nested under API
  # resource :session, only: [:new, :create, :destroy]

end
