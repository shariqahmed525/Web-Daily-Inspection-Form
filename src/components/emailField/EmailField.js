import React from 'react'
import { TextField } from '@material-ui/core';

import {
  makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    width: "90%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const EmailField = props => {
  const { value, error, onChange } = props;
  const classes = useStyles();
  return (
    <TextField
      required
      type="email"
      value={value}
      label="Email"
      margin="normal"
      id="standard-error"
      error={error !== ""}
      helperText={error}
      className={classes.textField}
      onChange={onChange}
    />
  )
}

export default EmailField
