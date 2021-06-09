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

if @userOptions[:ConnectionRequests]
  connectionRequests = @user.connection_requests
else
  connectionRequests = nil
end

if @userOptions[:requestedConnections]
  requestedConnections = @user.requested_connections
else
  requestedConnections = nil
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
json.requestedConnections do 
  if requestedConnections
    json.extract! requestedConnections, :ids
  end
end
json.pendingUsers do
  if pendingUsers
    json.extract! pendingUsers, :ids
  end
end
json.connectionRequests do
  if connectionRequests
    json.extract! connectionRequests, :ids
  end
end
json.usersRequestingConnection do 
  if usersRequestingConnection
    json.extract! usersRequestingConnection, :ids
  end
end