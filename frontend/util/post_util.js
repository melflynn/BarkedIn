export const createPost = (body) => (
  $.ajax({
    method: 'POST', 
    url: '/api/posts',
    data: { body }
  })
)

export const fetchPosts = (postIds) => (
  $.ajax({
    method: 'GET',
    url: '/api/posts',
    data: { postIds }
  })
)

export const fetchPost = (postId) => (
  $.ajax({
    method: 'GET',
    url: `/api/posts/${postId}`
  })
)
