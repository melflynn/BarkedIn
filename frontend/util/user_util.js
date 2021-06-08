export const fetchUser = (userId, userOptions) => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}`,
    data: { userOptions }
  })
)

export const fetchUsers = (userIds) => (
  $.ajax({
    method: 'GET',
    url: '/api/users',
    data: { userIds }
  })
)

export const updateUser = (user) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user }
  })
)