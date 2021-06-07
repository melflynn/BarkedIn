if (user.profile_photo.attached?)
  profilePhotoUrl = url_for(user.profile_photo)
else
  profilePhotoUrl = nil
end

json.extract! user, :id, :first_name, :last_name, :email, :breed, :country, :region, :about_me
json.profilePhotoUrl profilePhotoUrl
json.connections do 
  json.extract! user.connections, :ids
end
json.connectedUsers do 
  json.extract! user.connected_users, :ids
end