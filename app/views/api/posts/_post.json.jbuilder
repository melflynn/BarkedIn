json.extract! post, :id, :author_id, :body
json.reactions do 
  json.extract! post.reactions, :ids
end