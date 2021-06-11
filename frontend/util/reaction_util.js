export const createReaction = (postId, reactionType) => (
  $.ajax({
    method: 'POST',
    url: `/api/posts/${postId}/reactions`,
    data: { reactionType }
  })
)