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
  Paper,
  TableBody,
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
import { route, cloneUser, updatePassword } from '../../redux/actions/actions';
import { AUTH } from '../../constant/firebase';
import Loader from '../../components/loader/Loader';

const useStyles = makeStyles(theme => ({
  paper: {
    width: "90%",
    overflowX: "auto",
    padding: "10px 20px",
    color: theme.palette.text.secondary,
  },
  root: {
    flex: 1,
    height: '100vh',
    display: 'flex',
    padding: "50px 10px 10px 10px",
    alignItems: 'center',
    justifyContent: 'center',
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
  }
}));

const Users = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [viewPass, setViewPass] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [showPassword, setShowPassword] = useState("");
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
    const { reducer } = store.getState();
    const { user } = reducer;
    store.dispatch(cloneUser(user));
    store.dispatch(route("/users"));
    getStateFromStore();
    store.subscribe(getStateFromStore);
  }, [])

  const getStateFromStore = () => {
    const { reducer } = store.getState();
    const { users } = reducer;
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
    const { reducer } = store.getState();
    const { cloneUser } = reducer;
    const { email, password, id } = selectedUser;

    if (!password.trim()) {
      setPasswordError("Please enter password.");
      return;
    }
    if (password.trim().length < 6) {
      setPasswordError("Password must be greater than 5 characters.");
      return;
    }
    setLoading(true);

    try {

      /* sign in for selected user */
      const { user } = await AUTH.signInWithEmailAndPassword(email, password);

      try {

        /* selected user change password */
        await user.updatePassword(newPassword)

        /* update selected user password in database */
        store.dispatch(updatePassword(id, newPassword));

        try {

          /* admin sign in */
          await AUTH.signInWithEmailAndPassword(cloneUser.email, cloneUser.password);
          setLoading(false);
          setOpenDialog(false);

        } catch (error) {
          setLoading(false);
          console.log(error, " error in admin sign in after change user password");
        }

      } catch (error) {
        setLoading(false);
        console.log(error, " error in change user password");
      }

    } catch (error) {
      setLoading(false);
      console.log(error, " error in change user password login");
    }
  }

  const _delete = () => { }

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
        title={`Are sure to change ${selectedUser.email} passowrd?`}
        onEyeClick={() => setShowPassword(!showPassword)}
      />

      <Paper className={classes.paper}>
        <div className={classes.searchBarContainer}>
          <div className={classes.searchBarWrapper}>
            {isShowSearchBar && (
              <TextField
                id="standard-search"
                label="Search field"
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
                                aria-label="Update"
                                color="primary"
                                onClick={() => _viewPass(value.id)}
                              >
                                {viewPass.includes(value.id) ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                aria-label="Update"
                                color="primary"
                                onClick={() => _edit(value)}
                              >
                                <EditSharp />
                              </IconButton>
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                aria-label="Delete"
                                color="secondary"
                                onClick={() => _delete()}
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
      </Paper>
    </div>
  )
}

export default Users;
