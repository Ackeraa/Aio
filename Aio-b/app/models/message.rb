class Message < ApplicationRecord

    def self.search(query, page, user)
        return { total: 0, messages: [] } if user.nil?

        statements = []
        statements << "#{user.id} = any(receiver_ids)"
        statements << "category ilike '%#{query}%'" if query.present?

        conditions = statements.join(' and ')

        total = Message.where(conditions).count
        messages = Message.where(conditions).limit(20).offset(page * 20)

        { total: total, messages: messages }
    end
end
