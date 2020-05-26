import types from '../actions/types';

const initState = {
  name: '',
  email: '',
  password: '',
  formError: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.INIT_AUTH: 
      return { ...state, password: '', formError: {} };
    case types.VALUE_CHANGE:
      return { ...state, ...action.payload };
    
    case types.FORM_ERROR:
      return { ...state, formError: { ...state.formError, ...action.payload } };

    default:
      return state;
  }
};
