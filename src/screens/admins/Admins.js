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
  Typography,
} from '@material-ui/core';

import {
  Clear,
  Search,
} from '@material-ui/icons';

import AppBar from '../../components/appBar/AppBar';
import Drawable from '../../components/drawable/Drawable';
import {
  stableSort,
  getSorting,
} from "../../constant/functions";
import { store } from '../../redux/store/store';
import { route } from '../../redux/actions/actions';
import Loader from '../../components/loader/Loader';

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
  }
}));

const Admins = () => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchTxt, setSearchTxt] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

  const handleChangePage = (_, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
  };

  const searchItems = e => {
    const searchTxt = e.target.value;
    const result = admins.filter(item => {
      const lowerItem = item.email.toString().toLowerCase();
      const lowerText = searchTxt.toLowerCase();
      return lowerItem.indexOf(lowerText) !== -1;
    });
    setResult(result);
    setSearchTxt(searchTxt);
  };

  useEffect(() => {
    store.dispatch(route("/admins"));
    getStateFromStore();
    store.subscribe(getStateFromStore);
  }, [])

  const getStateFromStore = () => {
    const { reducer } = store.getState();
    const { admins } = reducer;
    setAdmins(admins);
    setIsLoading(false);
  }

  const items = searchTxt ? result : admins;

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
        <div onClick={() => setIsShowSearchBar(false)}>
          <Typography variant="h4" color="secondary" style={{
            textAlign: 'center',
            marginTop: "0.35em",
          }}>
            Admins
          </Typography>
        </div>
        <div className={classes.searchBarContainer}>
          <div className={classes.searchBarWrapper}>
            {isShowSearchBar && (
              <TextField
                id="standard-search"
                label="Search Admins"
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
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading ? (
                items.length <= 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <p style={{ color: "red", marginTop: 10 }}>
                        No Admin Found
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
                              <span className={classes.password}>
                                {new Array(value.password.length).join(".")}
                              </span>
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

export default Admins;
