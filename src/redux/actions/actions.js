import { FIRESTORE } from '../../constants/firebase';

export const loader = loader => {
  return {
    type: "LOADER",
    loader
  };
};

export const allForm = allForm => {
  return {
    type: "ALL_FORMS",
    allForm
  };
};

export const allUsers = allUsers => {
  return {
    type: "ALL_USERS",
    allUsers
  };
};

export const isLogin = flag => {
  return {
    type: "IS_LOGIN",
    isLogin: flag
  };
};

// Database managements

export const getAllForms = () => {
  return (dispatch) => {
    FIRESTORE.collection("allforms")
      .orderBy("timeStamp", "asc")
      .onSnapshot(snap => {
        let arr = [];
        snap.forEach(doc => {
          var obj = doc.data();
          obj.id = doc.id;
          arr.push(obj);
        });
        dispatch(allForm(arr));
      });
  }
}

export const getAllUsers = () => {
  return (dispatch) => {
    FIRESTORE.collection("allUsers")
      .orderBy("timeStamp", "asc")
      .onSnapshot(snap => {
        let arr = [];
        snap.forEach(doc => {
          var obj = doc.data();
          obj.id = doc.id;
          arr.push(obj);
        });
        dispatch(allUsers(arr));
      });
  }
}