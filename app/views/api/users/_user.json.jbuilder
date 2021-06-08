if user.profile_photo.attached?
  profilePhotoUrl = url_for(user.profile_photo)
else
  profilePhotoUrl = nil
end

if user == current_user 
  connections = user.connections
else
  connections = nil
end

json.extract! user, :id, :first_name, :last_name, :email, :breed, :country, :region, :about_me
json.profilePhotoUrl profilePhotoUrl
json.connections do 
  if connections
    json.extract! connections, :ids
  end
end

