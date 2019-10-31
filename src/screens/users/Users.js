import React, {
  useState,
  useEffect,
} from 'react'
import './users.css';

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
  Edit,
  Clear,
  Search,
  Delete,
} from '@material-ui/icons';

import {
  stableSort,
  getSorting,
} from "../../constant/functions";

import AppBar from '../../components/appBar/AppBar';
import Drawable from '../../components/drawable/Drawable';
import { store } from '../../redux/store/store';
import { route } from '../../redux/actions/actions';

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
    padding: "0px 10px",
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
}));

const Users = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [isLoading, setIsLoading] = useState("  ");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  store.dispatch(route("/users"));

  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
  };

  const searchItems = e => {
    const searchTxt = e.target.value;
    const result = users.filter(item => {
      const lowerItem = item.title.toString().toLowerCase();
      const lowerText = searchTxt.toLowerCase();
      return lowerItem.indexOf(lowerText) !== -1;
    });
    setResult(result);
    setSearchTxt(searchTxt);
  };

  useEffect(() => {
    getStateFromStore();
    store.subscribe(getStateFromStore);
  }, [])

  const getStateFromStore = () => {
    const { reducer } = store.getState();
    // console.log(reducer);
  }

  const _edit = () => { }
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
                aria-label="Search"
                onClick={() => setIsShowSearchBar(!isShowSearchBar)}
              >
                <Search />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Password</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                items.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <p style={{ color: "red", marginTop: 10 }}>
                        No Books Found
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
                              {value.password}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                aria-label="Update"
                                color="primary"
                                onClick={() => _edit()}
                              >
                                <Edit />
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
                      <p style={{ marginTop: 10 }}>loading...</p>
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
