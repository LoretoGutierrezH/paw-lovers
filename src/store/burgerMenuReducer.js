import * as actionTypes from './actionTypes';

const initialState = {
  burgerState: 'closed'
}

const burgerMenuReducer = (state = initialState, action) => {
  if (action.type === actionTypes.OPEN) {
    return state = {
      ...state,
      burgerState: 'open'
    }
  }

  if (action.type === actionTypes.CLOSE) {
    return state = {
      ...state,
      burgerState: 'closed'
    }
  }

  return state;
}

export default burgerMenuReducer;