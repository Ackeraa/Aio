module Searchable
    extend ActiveSupport::Concern
    included do
        def self.base_search(scope, conditions, page, order_by='created_at desc', per_page=20)
            query = scope.where(conditions)
                         .select("#{table_name}.*, COUNT(*) OVER() AS total_count")
                         .order("#{order_by}")
                         .offset(page * per_page).limit(per_page)
        
            total = query.first&.total_count || 0
            results = query

            { total: total, "#{table_name}": results }
        end
    end
end