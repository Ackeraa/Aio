json.extract! message, :id, :type, :from, :to, :arg1, :created_at, :updated_at
json.url message_url(message, format: :json)
