# json.extract! @comment, :id, :post_id, :author_id, :body

json.partial! '/api/comments/comment', comment: @comment