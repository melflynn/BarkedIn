export const UPDATE_MODAL = 'UPDATE_MODAL';

export const updateModal = (modalName, post) => ({
  type: 'UPDATE_MODAL',
  modalName,
  post
});