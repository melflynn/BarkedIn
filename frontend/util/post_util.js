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

export const fetchNewsFeed = (userIds) => (
  $.ajax({
    method: 'GET',
    url: '/api/posts',
    data: { userIds }
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

const merge = (left, right) => {
  // debugger;
  let merged = [];
  while (!(left.length === 0) && !(right.length === 0)) {
    if (left[0].createdAt > right[0].createdAt) {
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }

  return merged.concat(left).concat(right)
}

export const sortPosts = (postArray) => {
  if (postArray.length <= 1) {
    return postArray;
  }
  let mid = Math.floor(postArray.length / 2)
  let left = sortPosts(postArray.slice(0, mid))
  let right = sortPosts(postArray.slice(mid))

  return merge(left, right)
}
