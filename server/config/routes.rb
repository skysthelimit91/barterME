Rails.application.routes.draw do
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'isLoggedIn', :to => 'users#is_logged_in'
  get 'myposts', :to => 'posts#myposts'
  get 'current', :to => 'users#current'

  post 'users/login', :to => 'users#login'


  resources :bottles
  resources :messages
  resources :posts





end
