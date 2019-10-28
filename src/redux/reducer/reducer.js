const reducer = (state = {}, action) => {
  switch (action.type) {
    case "IS_LOGIN": {
      return { ...state, isLogin: action.isLogin };
    }
    case "LOADER": {
      return { ...state, loader: action.loader };
    }
    case "USERS": {
      return { ...state, users: action.users };
    }
    case "ALL_FORMS": {
      return { ...state, allForm: action.allForm };
    }
    default: {
      return state;
    }
  }
};

export default reducer;