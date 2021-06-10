import { UPDATE_MODAL } from '../actions/ui_actions';

const _defaultUi = {
  modal: false
}

const UIReducer = (state = _defaultUi, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_MODAL:
      const modal = state.modal;
      let newState = Object.assign({}, state);
      if (modal) {
        newState['modal'] = false;
      } else {
        newState['modal'] = action.modalName;
        if (action.post) {
          newState['post'] = action.post;
        } else {
          delete newState['post'];
        }
      }
      return newState;
    default:
      return state;
  }
}

export default UIReducer;