module SearchHelper
    def search(scope, conditions, page, per_page = 20)
        query = scope.where(conditions)
                     .select("#{table_name}.*, COUNT(*) OVER() AS total_count")
                     .page(page)
                     .per(per_page)
    
        total = query.first&.total_count || 0
        results = query
    
        { total: total, results: results }
    end
end