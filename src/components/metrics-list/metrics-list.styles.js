import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  metrics: {
    position: 'absolute',
    top: theme.spacing(9),
    right: theme.spacing(2),
    display: 'none',
    width: 300,
    [theme.breakpoints.between('xs', 'sm')]: {
      top: theme.spacing(12),
    },
  },
  visible: {
    display: 'block',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    position: 'relative',
  },
  label: {
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
  },
}));
