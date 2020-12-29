import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  metrics: {
    position: 'absolute',
    top: 75,
    right: 32,
    display: 'none',
    width: 300,
  },
  visible: {
    display: 'block',
  },
}));
