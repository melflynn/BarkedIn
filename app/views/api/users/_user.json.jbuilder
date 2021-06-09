if user.profile_photo.attached?
  profilePhotoUrl = url_for(user.profile_photo)
else
  profilePhotoUrl = nil
end

if user == current_user 
  connections = user.connections
  connectedUsers = user.connected_users
  requestedConnections = user.requested_connections
  pendingUsers = user.pending_users
  connectionRequests = user.connection_requests
  usersRequestingConnection = user.users_requesting_connection
# else
#   connections = nil
#   pendingUsers = nil
#   usersRequestingConnection = nil
end

json.extract! user, :id, :first_name, :last_name, :email, :breed, :country, :region, :about_me
json.profilePhotoUrl profilePhotoUrl
json.connections do 
  if connections
    json.extract! connections, :ids
  end
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
