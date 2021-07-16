export const createReaction = (postId, reactionType) => (
  $.ajax({
    method: 'POST',
    url: `/api/posts/${postId}/reactions`,
    data: { reactionType }
  })
)

export const updateReaction = (postId, reactionType) => (
  $.ajax({
    method: 'GET',
    url: `/api/posts/${postId}/reactions/`
  }).then((reaction) => {
      $.ajax({
        method: 'PATCH',
        url: `/api/posts/${postId}/reactions/${reaction.id}`,
        data: { reactionType }
      })
      console.log(reaction)
    })
)