export const createComment = (postId, body) => (
  $.ajax({
    method: 'POST',
    url: `/api/posts/${postId}/comments`,
    data: { body }
  })
)