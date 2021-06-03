json.extract! user, :id, :first_name, :last_name, :email, :breed, :country, :region, :about_me
json.profilePhotoUrl url_for(user.profile_photo)