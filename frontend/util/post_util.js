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

export const updatePost = (post) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/posts/${post.id}`,
    data: { post }
  })
) 

export const deletePost = (postId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/posts/${postId}`
  })
)
