if @user == current_user
  connectedUsers = @user.connected_users
  pendingUsers = @user.pending_users
  usersRequestingConnection = @user.users_requesting_connection
else 
  if @userOptions[:connectedUsers]
    connectedUsers = @user.connected_users
  else
    connectedUsers = nil
  end

  if @userOptions[:pendingUsers]
    pendingUsers = @user.pending_users
  else
    pendingUsers = nil
  end

  if @userOptions[:usersRequestingConnection]
    usersRequestingConnection = @user.users_requesting_connection
  else
    usersRequestingConnection = nil
  end
end

json.partial! '/api/users/user', user: @user
json.connections do 
  json.extract! @user.connections, :ids
end
json.connectedUsers do 
  if connectedUsers
    json.extract! connectedUsers, :ids
  end
end
json.pendingUsers do
  if pendingUsers
    json.extract! pendingUsers, :ids
  end
end
# json.connectionRequests do
#   json.extract! @user.connection_requests, :ids
# end
json.usersRequestingConnection do 
  if usersRequestingConnection
    json.extract! usersRequestingConnection, :ids
  end
end