import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  dashboard: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '75px 1fr',
    [theme.breakpoints.between('xs', 'sm')]: {
      gridTemplateRows: '100px 1fr',
    },
  },
  toolbar: {
    minHeight: 50,
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: 10,
    [theme.breakpoints.between('xs', 'sm')]: {
      minHeight: 70,
    },
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
    right: theme.spacing(2),
    top: theme.spacing(2),
    [theme.breakpoints.between('xs', 'sm')]: {
      top: theme.spacing(5),
    },
  },
  chartContainer: {
    height: '100%',
    width: '100%',
  },
}));
