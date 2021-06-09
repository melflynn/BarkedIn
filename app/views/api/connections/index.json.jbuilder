

@connections.each do |connection|
  json.set! connection.id do 
    json.extract! connection, :id, :user_id1, :user_id2
  end
end