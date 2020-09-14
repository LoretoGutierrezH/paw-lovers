import * as actionTypes from './authActions';
const initialState = {
  authenticated: false,
  authModal: false
}

const authReducer = (state = initialState, action) => {
    if (action.type === actionTypes.AUTHENTICATE) {
      return state = {
        ...state,
        authenticated: true,
        authModal: false
      }
    }
  if (action.type === actionTypes.ACTIVATE) {
    return state = {
      ...state,
      authModal: state.authModal === false ? true : false
    }
  }
    return state;

}

export default authReducer;