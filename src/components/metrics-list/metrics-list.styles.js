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
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
    minWidth: 120,
    position: 'relative',
  },
  label: {
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
  },
}));
