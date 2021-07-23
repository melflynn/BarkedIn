json.extract! post, :id, :author_id, :body, :created_at
json.reactions do 
  json.extract! post.reactions, :ids
end
json.likers do 
  json.extract! post.likers, :ids
end
json.comments do 
  json.extract! post.comments, :ids
end