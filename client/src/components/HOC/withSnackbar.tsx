import React from 'react';
import { connect } from 'react-redux';

import { snackbar } from '../../store/actions';

const mapDispatchToProps = (dispatch: any) => ({
  showSuccess: (msg: string) =>
    dispatch({
      type: snackbar.UPDATE,
      open: true,
      msg,
      severity: 'success'
    }),
  showError: (msg: string) =>
    dispatch({
      type: snackbar.UPDATE,
      open: true,
      msg,
      severity: 'error'
    })
});

export interface WithSnackbarProps {
  showSuccess: (msg?: string) => void;
  showError: (msg?: string) => void;
}

//withSnackbar HOC wraps a component and returns that component with
//dispatch actions to mutate the snackbar redux store
export const withSnackbar = (WrappedComponent: any) => {
  const wrappedWithSnackbar: React.FC<any> = ({ showSuccess, showError }) => {
    return <WrappedComponent showSuccess={showSuccess} showError={showError} />;
  };
  return connect(null, mapDispatchToProps)(wrappedWithSnackbar);
};
