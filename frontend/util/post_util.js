export const createPost = (body) => (
  $.ajax({
    method: 'POST', 
    url: '/api/posts',
    data: { body }
  })
)