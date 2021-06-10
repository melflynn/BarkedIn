# json.extract! @post, :id, :author_id, :body

json.partial! '/api/posts/post', post: @post