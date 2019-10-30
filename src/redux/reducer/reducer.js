const reducer = (state = {}, action) => {
  switch (action.type) {
    case "IS_LOGIN": {
      return { ...state, isLogin: action.isLogin };
    }
    case "LOGIN_USER": {
      return { ...state, email: action.email, password: action.password, uid: action.uid, };
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
    case "PREVIOUS_ROUTE": {
      return { ...state, previousRoute: action.previousRoute };
    }
    default: {
      return state;
    }
  }
};

export default reducer;