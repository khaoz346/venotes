import { createMuiTheme } from '@material-ui/core/styles';

const theme = {
  typography: {
    fontFamily: 'Teko'
  },
  palette: {
    primary: {
      main: '#1C9FDF'
    },
    secondary: {
      main: '#8F88DB'
    },
    background: {
      default: '#F7F8FA'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        boxShadow: 'none'
      },
      containedPrimary: {
        textTransform: 'none' as any,
        boxShadow: 'none',
        color: 'white',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '#898CDD',
          transition: 'none',
          boxShadow: 'none'
        }
      }
    },
    MuiCard: {
      root: {
        borderRadius: '16px'
      }
    },
    MuiCardHeader: {
      root: {
        borderBottom: '1px solid #E6E6E6'
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: 'white'
      }
    },
    MuiTextField: {
      root: {
        backgroundColor: '#F8F9FC'
      }
    }
  },
  props: {
    MuiPaper: {
      elevation: 20
    }
  }
};

export default createMuiTheme(theme);
