Rails.application.routes.draw do
  resources :users, except: [:index]
  resource :sessions, only: [:new, :create, :destroy]
  resources :pages, only: [:index, :about, :landing]
  resource :dashboard, only: [:index]

  namespace :api,
   defaults: { format: :json } do
    resources :boards do
      resources :hooks, only: [:create, :update, :destroy]
    end
    resources :lists, only: [:index, :show, :create, :update, :destroy]
    resources :cards, only: [:index, :create, :update, :destroy, :show]
    resources :repositories, only: [:index, :show]
    resources :issues, only: [:destroy, :show, :create, :update, :index]

  end

  get "/auth/:provider/callback" => "sessions#create"
  get "/landing" => "pages#landing"
  get "/signout" => "sessions#destroy", :as => :signout
  root 'pages#index'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
