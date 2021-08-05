if @userOptions[:connectedUsers]
  connectedUsers = @user.connected_users
end

if @userOptions[:pendingUsers]
  pendingUsers = @user.pending_users
end

if @userOptions[:usersRequestingConnection]
  usersRequestingConnection = @user.users_requesting_connection
end

if @userOptions[:ConnectionRequests]
  connectionRequests = @user.connection_requests
end

if @userOptions[:requestedConnections]
  requestedConnections = @user.requested_connections
end

if @userOptions[:posts]
  posts = @user.posts
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
json.posts do 
  if posts
    json.extract! posts, :ids
  end
end