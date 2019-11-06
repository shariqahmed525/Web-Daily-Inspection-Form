import React from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';

import Loader from '../../components/loader/Loader';
import PasswordField from '../passwordField/PasswordField.js';

const AppDialog = props => {
  const {
    open,
    title,
    btnText,
    onClose,
    onClick,
    loading,
    password,
    onChange,
    onEyeClick,
    showPassword,
    passwordError,
  } = props;

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{loading ? "Changing password..." : title}</DialogTitle>
      <DialogContent>
        {!loading ? (
          <PasswordField
            id="pass"
            value={password}
            loading={loading}
            onChange={onChange}
            title="New Password"
            error={passwordError}
            onEyeClick={onEyeClick}
            showPassword={showPassword}
          />
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Loader
                style={{
                  width: 128,
                }}
              />
            </div>
          )}
      </DialogContent>
      {!loading && <DialogActions>
        <Button onClick={onClose} color="default">
          Close
        </Button>
        <Button onClick={onClick} color="primary" autoFocus>
          {btnText}
        </Button>
      </DialogActions>}
    </Dialog>
  )
}

export default AppDialog;
