import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  readingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    [theme.breakpoints.between('xs', 'md')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'column',
    marginBottom: 10,
    [theme.breakpoints.down('md')]: {
      marginRight: 10,
      width: 200,
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      marginRight: 10,
      width: 160,
    },
  },
  reading: {
    margin: 0,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '1.4rem',
    },
  },
  readingTitle: {
    margin: 0,
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '1rem',
    },
  },
  metricColor: {
    display: 'inline-block',
    width: '20px',
    height: '10px',
    marginRight: '5px',
  },
}));
