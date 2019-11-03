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
    width: "100%",
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const PasswordField = props => {

  const classes = useStyles();
  const {
    id,
    title,
    value,
    error,
    onChange,
    disabled,
    onEyeClick,
    showPassword,
  } = props;

  return (
    <FormControl error={error !== ""} disabled={disabled} className={clsx(classes.margin, classes.textField)}>
      <InputLabel required htmlFor={id}>{title}</InputLabel>
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={disabled}
              onClick={onEyeClick}
              aria-label="toggle password visibility"
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
