export const createComment = (postId, body) => (
  $.ajax({
    method: 'POST',
    url: `/api/posts/${postId}/comments`,
    data: { body }
  })
)

export const fetchComments = (postId, limit, offset) => (
  $.ajax({
    method: 'GET',
    url: `/api/posts/${postId}/comments`,
    data: {
      postId,
      limit,
      offset
    }
  })
)