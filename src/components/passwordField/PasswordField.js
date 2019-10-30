import React from 'react'
import clsx from 'clsx';
import {
  Input,
  InputLabel,
  IconButton,
  FormControl,
  FormHelperText,
  InputAdornment,
} from '@material-ui/core';
import {
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import {
  makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    width: "90%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

const PasswordField = props => {

  const classes = useStyles();
  const {
    title,
    value,
    error,
    onChange,
    onEyeClick,
    showPassword,
  } = props;

  return (
    <FormControl error={error !== ""} className={clsx(classes.margin, classes.textField)}>
      <InputLabel required htmlFor="standard-adornment-password">{title}</InputLabel>
      <Input
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onEyeClick}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && (
        <FormHelperText id="standard-weight-helper-text">
          {error}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default PasswordField;
