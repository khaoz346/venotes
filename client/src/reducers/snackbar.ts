import { snackbar } from '../actions';

interface InitialState {
  open: boolean;
  msg: string;
  severity: string | undefined;
}

const initialState: InitialState = {
  open: false,
  msg: '',
  severity: undefined
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case snackbar.UPDATE:
      const { open, msg, severity } = action;
      return {
        ...state,
        open,
        msg,
        severity
      };
    default:
      return initialState;
  }
};

export default reducer;
