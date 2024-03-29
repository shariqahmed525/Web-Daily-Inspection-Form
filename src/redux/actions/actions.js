import { FIRESTORE } from '../../constant/firebase';

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


export const users = users => {
  return {
    type: "USERS",
    users
  };
};

export const admins = admins => {
  return {
    type: "ADMINS",
    admins
  };
};

export const isLogin = flag => {
  return {
    type: "IS_LOGIN",
    isLogin: flag
  };
};

export const route = route => {
  return {
    type: "ROUTE",
    route,
  };
};

export const uid = uid => {
  return {
    type: "UID",
    uid,
  };
};

export const user = user => {
  return {
    type: "USER",
    user,
  };
};


// Database managements

export const getAllForms = () => {
  return (dispatch) => {
    const ref = FIRESTORE.collection("allforms");
    ref.onSnapshot(snap => {
      let arr = [];
      snap.forEach(snapshot => {
        const userId = snapshot.id;
        ref.doc(userId).collection('form').onSnapshot(subSnapshot => {
          subSnapshot.forEach(subSnap => {
            var obj = {
              userId,
              ...subSnap.data(),
              formId: subSnap.id,
            }
            arr.push(obj);
          })
          dispatch(allForm(arr));
        })
      })
    })
  }
}

export const getUsers = () => {
  return (dispatch) => {
    FIRESTORE.collection("users")
      .where("type", "==", "user")
      .onSnapshot(snap => {
        let arr = [];
        snap.forEach(doc => {
          var obj = {
            ...doc.data(),
            id: doc && doc.id
          }
          arr.push(obj);
        });
        dispatch(users(arr));
      });
  }
}

export const getUser = uid => {
  return (dispatch) => {
    FIRESTORE.collection("users")
      .doc(uid)
      .onSnapshot(snap => {
        var obj = {
          ...snap.data(),
          id: snap && snap.id
        };
        dispatch(user(obj));
      });
  }
}

export const getAdmins = () => {
  return (dispatch) => {
    FIRESTORE.collection("users")
      .where("type", "==", "admin")
      .onSnapshot(snap => {
        let arr = [];
        snap.forEach(doc => {
          var obj = {
            ...doc.data(),
            id: doc && doc.id
          };
          arr.push(obj);
        });
        dispatch(admins(arr));
      });
  }
}

export const createUser = (uid, email, password, type) => {
  return () => {
    FIRESTORE.collection("users").doc(uid).set({
      email,
      password,
      type
    })
  }
};

export const updatePassword = (uid, password) => {
  return () => {
    FIRESTORE.collection("users").doc(uid).update({
      password,
    })
  }
};