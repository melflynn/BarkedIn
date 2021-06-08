export const requestConnection = (requesterId, requesteeId) => {
  let connection = {};
  if (requesterId < requesteeId) {
    connection['user_id1'] = requesterId;
    connection['user_id2'] = requesteeId;
  } else {
    connection['user_id1'] = requesteeId;
    connection['user_id2'] = requesterId;
  }

  return $.ajax({
    method: 'POST',
    url: '/api/connections',
    data: { connection }
  })
}

export const acceptConnection = (connectionId) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/connections/${connectionId}`
  })
)

export const deleteConnection = (connectionId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/connections/${connectionId}`
  })
)

export const findConnection = (user_id1, user_id2) => {
  if (user_id1 > user_id2) {
    let temp = user_id1;
    user_id1 = user_id2; 
    user_id2 = temp;
  }
  return $.ajax({
    method: 'GET',
    url: '/api/connections',
    data: { user_id1, user_id2 }
  })
}