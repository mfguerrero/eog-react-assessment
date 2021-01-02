import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  dashboard: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '75px 1fr',
  },
  toolbar: {
    minHeight: 50,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  title: {
    display: 'flex',
  },
  titleText: {
    flexGrow: 1,
    marginRight: 20,
  },
  name: {
    [theme.breakpoints.between('xs', 'sm')]: {
      display: 'none',
    },
  },
  weatherContainer: {
    [theme.breakpoints.between('xs', 'sm')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    gridGap: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  metricsFab: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(4),
  },
  chartContainer: {
    height: '100%',
    width: '100%',
  },
}));
