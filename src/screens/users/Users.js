import React, {
  useState,
  useEffect,
} from 'react'

import {
  makeStyles
} from '@material-ui/core/styles';
import {
  Table,
  Tooltip,
  TableRow,
  TableHead,
  TableCell,
  TextField,
  IconButton,
  TablePagination,
  TableBody,
  Typography,
} from '@material-ui/core';

import {
  Clear,
  Search,
  Delete,
  EditSharp,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';

import AppBar from '../../components/appBar/AppBar';
import Dialog from '../../components/dialog/Dialog';
import Drawable from '../../components/drawable/Drawable';

import {
  stableSort,
  getSorting,
} from "../../constant/functions";
import { store } from '../../redux/store/store';
import { route, getAdmins, getUsers } from '../../redux/actions/actions';
import Loader from '../../components/loader/Loader';
import {
  DELETE_USER,
  UPDATE_PASSWORD,
  FIREBASE_URL,
} from '../../constant/helper';
import { AUTH } from '../../constant/firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    width: "90%",
    overflowX: "auto",
    padding: "10px 20px",
    color: theme.palette.text.secondary,
    boxShadow: "rgba(0,0,0,0.2) 5px 5px 5px",
  },
  root: {
    flex: 1,
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "0px 10px 0px 10px",
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
  },
  searchBarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  searchBarWrapper: {
    height: 80,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  password: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loaderWrapper: {
    flex: 1,
    zIndex: 1,
    width: "90%",
    display: 'flex',
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Users = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [viewPass, setViewPass] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newPassword, setNewPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showPassword, setShowPassword] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
  };

  const searchItems = e => {
    const searchTxt = e.target.value;
    const result = users.filter(item => {
      const lowerItem = item.email.toString().toLowerCase();
      const lowerText = searchTxt.toLowerCase();
      return lowerItem.indexOf(lowerText) !== -1;
    });
    setResult(result);
    setSearchTxt(searchTxt);
  };

  useEffect(() => {
    store.dispatch(route("/users"));
    getStateFromStore();
    store.subscribe(getStateFromStore);
  }, [])

  const getStateFromStore = () => {
    const { reducer } = store.getState();
    const { users, user } = reducer;
    setUser(user);
    setUsers(users);
    setIsLoading(false);
  }

  const _viewPass = (id) => {
    const index = viewPass.indexOf(id);
    if (index !== -1) {
      viewPass.splice(index, 1);
    }
    else {
      viewPass.push(id);
    }
    setViewPass([...viewPass]);
  }

  const _edit = (user) => {
    setOpenDialog(true);
    setSelectedUser(user);
  }

  const _changePass = async () => {
    const { id } = selectedUser;

    if (!newPassword.trim()) {
      setPasswordError("Please enter password.");
      return;
    }
    if (newPassword.trim().length < 6) {
      setPasswordError("Password must be greater than 5 characters.");
      return;
    }
    setLoading(true);

    try {
      await fetch(`${FIREBASE_URL}${UPDATE_PASSWORD}?userId=${id}&newPassword=${newPassword}`, {
        mode: "no-cors",
      })
      setLoading(false);
      setNewPassword("");
      setOpenDialog(false);
    }
    catch (err) {
      setLoading(false);
      console.log(err, " error in change password");
    }
  }

  const _delete = async (uid) => {
    const { email, password } = user;
    try {
      setDisabled(true);
      await fetch(`${FIREBASE_URL}${DELETE_USER}?userId=${uid}&collectionName=users`, {
        mode: "no-cors",
      })
      AUTH.signInWithEmailAndPassword(email, password).then((res) => {
        store.dispatch({
          email,
          password,
          type: "LOGIN_USER",
          uid: res.user.uid,
        })
      })
      store.dispatch(getUsers());
      store.dispatch(getAdmins());
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.log(error, " error in delete user");
    }
  }

  const items = searchTxt ? result : users;

  return (
    <div className={classes.root}>
      <AppBar
        open={open}
        onClick={() => setOpen(true)}
      />
      <Drawable
        open={open}
        onClick={() => setOpen(false)}
      />

      <Dialog
        open={openDialog}
        btnText={"Change"}
        loading={loading}
        onClick={_changePass}
        password={newPassword}
        showPassword={showPassword}
        onChange={({ target }) => {
          setPasswordError("");
          setNewPassword(target.value);
        }}
        passwordError={passwordError}
        onClose={() => setOpenDialog(false)}
        title={`Are sure to change ${selectedUser && selectedUser.email} passowrd?`}
        onEyeClick={() => setShowPassword(!showPassword)}
      />
      {disabled && (
        <div className={classes.loaderWrapper}>
          <Loader
            style={{
              width: 150,
            }}
          />
        </div>
      )}
      <div className={classes.paper} style={{ backgroundColor: disabled ? "#c8c8c8" : "#fff" }}>

        <div onClick={() => setIsShowSearchBar(false)}>
          <Typography variant="h4" color="secondary" style={{
            textAlign: 'center',
            marginTop: "0.35em",
          }}>
            Users
          </Typography>
        </div>
        <div className={classes.searchBarContainer}>
          <div className={classes.searchBarWrapper}>
            {isShowSearchBar && (
              <TextField
                id="standard-search"
                label="Search Users"
                type="text"
                margin="normal"
                style={{
                  width: "100%"
                }}
                value={searchTxt}
                onChange={e => searchItems(e)}
              />
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {searchTxt && isShowSearchBar && (
              <IconButton
                aria-label="clear"
                onClick={() => {
                  setSearchTxt("");
                }}
              >
                <Clear />
              </IconButton>
            )}
            <Tooltip title="Search">
              <IconButton
                disabled={isLoading}
                aria-label="Search"
                color="secondary"
                onClick={() => setIsShowSearchBar(!isShowSearchBar)}
              >
                <Search />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={classes.tableWrapper} onClick={() => setIsShowSearchBar(false)}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Password</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Change Password</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                items.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <p style={{ color: "red", marginTop: 10 }}>
                        No User Found
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                    stableSort(items, getSorting("asc", "email"))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((value, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell align="center">
                              {value.email}
                            </TableCell>
                            <TableCell align="center">
                              {viewPass.includes(value.id) ? (
                                value.password
                              ) : (
                                  <span className={classes.password}>
                                    {new Array(value.password.length).join(".")}
                                  </span>
                                )}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                color="primary"
                                disabled={disabled}
                                aria-label="Update"
                                onClick={() => _viewPass(value.id)}
                              >
                                {viewPass.includes(value.id) ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                disabled={disabled}
                                aria-label="Update"
                                color="primary"
                                onClick={() => _edit(value)}
                              >
                                <EditSharp />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                disabled={disabled}
                                aria-label="Delete"
                                color="secondary"
                                onClick={() => _delete(value.id)}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })
                  )
              ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Loader
                        style={{
                          width: 50,
                          margin: "0px auto"
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[
            5,
            10,
            items.length > 25 ? items.length : 25
          ]}
          component={"div"}
          style={{
            fontSize: 10
          }}
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  )
}

export default Users;
