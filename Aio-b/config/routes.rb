Rails.application.routes.draw do

  resources :contests do
    collection do
      get 'search',                             :action => 'search'
      get ':id/problems',                       :action => 'problems'     
      get ':id/add_problem/:problem_id',        :action => 'add_problem'     
      get ':id/delete_problem/:problem_id',     :action => 'delete_problem'     
    end
  end

  resources :problems do
    collection do
      get  'search',                            :action => 'search'
      post 'upload_template',                   :action => 'upload_template'
      post 'delete_template',                   :action => 'delete_template'
      post 'upload_spj',                        :action => 'upload_spj'
      post 'delete_spj',                        :action => 'delete_spj'
      post 'upload_data',                       :action => 'upload_data'
      post 'delete_data',                       :action => 'delete_data'
      post ':id/submit',                        :action => 'submit'     
    end
  end

  resources :vproblems do
    collection do
      get  'search',                            :action => 'search'
      get  ':id/respide',                       :action => 'respide'
      get  'respides',                          :action => 'respides'
      post ':id/submit',                        :action => 'submit'     
    end
  end


  resources :problem_sets do
    collection do
      get  'search',                            :action => 'search'
      get ':id/problems',                       :action => 'problems'     
      get ':id/add_problem/:problem_id',        :action => 'add_problem'     
      get ':id/delete_problem/:problem_id',     :action => 'delete_problem'     
    end
  end

  resources :users do
    collection do
      get  'search',                            :action => 'search'
      get ':id/add_user/:user_id',              :action => 'add_user'     
      get ':id/delete_user/:user_id',           :action => 'delete_user'     
      get ':id/get_info',                       :action => 'get_info'
      get ':id/get_contests',                   :action => 'get_contests'
      get ':id/get_problems',                   :action => 'get_problems'
      get ':id/get_groups',                     :action => 'get_groups'
      get ':id/get_friends',                    :action => 'get_friends'
    end
  end

  resources :groups do
    collection do
      get  'search',                            :action => 'search'
      get ':id/add_group/:group_id',            :action => 'add_group'     
      get ':id/delete_group/:group_id',         :action => 'delete_group'     
      get ':id/get_info',                       :action => 'get_info'
      get ':id/get_members',                    :action => 'get_members'
      get ':id/get_contests',                   :action => 'get_contests'
      get ':id/get_problem_sets',               :action => 'get_problem_sets'
    end
  end

  resources :acm_contest_ranks do
    collection do
      get  'search',                            :action => 'search'
      get 'get_contest_rank',                   :action => 'get_contest_rank'
    end
  end

=begin
  resources :submission_records do
    collection do
      get  'search',                            :action => 'search'
    end
  end
=end

  resources :submissions do
    collection do
      get  'search',                            :action => 'search'
    end
  end

  resources :comments do
    collection do
      get  'search',                            :action => 'search'
      post 'vote_up',                           :action => 'vote_up'
      post 'vote_down',                         :action => 'vote_down'
    end
  end

  resources :items
  resources :solutions
  resources :problems
  resources :vproblems
  resources :homes
  resources :discussions
  resources :contest

  mount_devise_token_auth_for 'User', at: 'auth'
  mount ActionCable.server => '/cable'

end

