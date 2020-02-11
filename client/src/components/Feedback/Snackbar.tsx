import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';

import { snackbar } from '../../store/actions';

const Snackbar: React.FC<any> = ({ snackbarState, dispatch }) => {
  const handleClose = (_event: any, reason: any) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: snackbar.CLEAR
    });
  };
  return (
    <MuiSnackbar
      open={snackbarState.open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={snackbarState.severity}>{snackbarState.msg}</Alert>
    </MuiSnackbar>
  );
};

export default connect(
  state => ({ snackbarState: (state as any).snackbar }),
  dispatch => ({ dispatch })
)(Snackbar);
