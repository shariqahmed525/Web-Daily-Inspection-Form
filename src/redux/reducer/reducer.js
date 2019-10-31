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
    case "USER": {
      return { ...state, user: action.user };
    }
    case "ALL_FORMS": {
      return { ...state, allForm: action.allForm };
    }
    case "ROUTE": {
      return { ...state, route: action.route };
    }
    case "UID": {
      return { ...state, uid: action.uid };
    }
    default: {
      return state;
    }
  }
};

export default reducer;