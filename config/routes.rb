Rails.application.routes.draw do

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'

  root "pages#timeline"

  get "simple", to: "pages#simple"
  get "no-router", to: "pages#no_router"

  # React Router needs a wildcard
  get "react-router(/*all)", to: "pages#index"

  get '/landing', to: "pages#landing"

  resources :timelines, param: :share_token, only: [:show]
  resources :timelines, param: :edit_token, only: [:edit]

  resources :comments
  resources :events
  

  mount ActionCable.server => "/cable"
end
