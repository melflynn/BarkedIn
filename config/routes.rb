Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index, :update, :destroy] do
      resources :posts, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :connections, only: [:create, :update, :destroy, :index]
    resources :posts, only: [:create, :index]
  end

end
