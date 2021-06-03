import UPDATE_MODAL from '../actions/modal_actions';

const _defaultUi = {
  modal: false
}

const modalReducer = (state = _defaultUi, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_MODAL:
      let newState = Object.assign({}, state);
      newState[modal] = !newState.modal;
      return newState;
    default:
      return state;
  }
}

export default modalReducer;