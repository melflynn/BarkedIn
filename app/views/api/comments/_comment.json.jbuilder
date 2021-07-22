author = comment.author


json.extract! comment, :id, :post_id, :author_id, :body
json.author do 
  profilePhotoUrl = url_for(author.profile_photo)
  json.extract! author, :first_name, :last_name
  json.profilePhotoUrl profilePhotoUrl
end