Rails.application.routes.draw do
  resources :contest_ranks
  resources :contests do
    collection do
      get ':id/problems',                       :action => 'problems'     
      get ':id/add_problem/:problem_id',        :action => 'add_problem'     
      get ':id/delete_problem/:problem_id',     :action => 'delete_problem'  
    end
  end

  resources :problems do
    collection do
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
      get  ':id/respide',                       :action => 'respide'
      get  'respides',                          :action => 'respides'
      post ':id/submit',                        :action => 'submit'     
    end
  end


  resources :problem_sets do
    collection do
      get ':id/problems',                       :action => 'problems'     
      get ':id/add_problem/:problem_id',        :action => 'add_problem'     
      get ':id/delete_problem/:problem_id',     :action => 'delete_problem'     
    end
  end

  resources :users do
    collection do
      get  ':id/get_info',                      :action => 'get_info'
      get  ':id/get_contests',                  :action => 'get_contests'
      get  ':id/get_problems',                  :action => 'get_problems'
      get  ':id/get_groups',                    :action => 'get_groups'
      get  ':id/get_friends',                   :action => 'get_friends'
      get  ':id/get_photo',                     :action => 'get_photo'
      put  ':id',                               :action => 'update'
      post ':id/connect',                       :action => 'connect'
      post 'upload_photo',                      :action => 'upload_photo'
    end
  end

  resources :groups do
    collection do
      get  ':id/add_group/:group_id',           :action => 'add_group'     
      get  ':id/delete_group/:group_id',        :action => 'delete_group'     
      get  ':id/get_info',                      :action => 'get_info'
      get  ':id/get_photo',                     :action => 'get_photo'
      get  ':id/get_members',                   :action => 'get_members'
      get  ':id/get_contests',                  :action => 'get_contests'
      get  ':id/get_problem_sets',              :action => 'get_problem_sets'
      post 'upload_photo',                      :action => 'upload_photo'
      post ':id/join',                          :action => 'join'
      post ':id/quit',                          :action => 'quit'
    end
  end

  resources :acm_contest_ranks do
    collection do
      get  'get_contest_rank',                  :action => 'get_contest_rank'
    end
  end

  resources :messages do
    collection do
      post ':id/agree',                         :action => 'agree'
      post ':id/disagree',                      :action => 'disagree'
      post ':id/read',                          :action => 'read'
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
  resources :messages

  mount_devise_token_auth_for 'User', at: 'auth'
  mount ActionCable.server => '/cable'

end

