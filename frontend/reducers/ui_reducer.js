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
      newState['modal'] = !modal;
      return newState;
    default:
      return state;
  }
}

export default UIReducer;