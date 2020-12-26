import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

const MetricsList = () => {
  return (
    <List>
      <ListSubheader>Current Metrics</ListSubheader>
      <ListItem>
        <Switch color="primary" />
        <ListItemText primary="flareTemp" />
      </ListItem>
      <ListItem>
        <Switch color="primary" />
        <ListItemText primary="oilTemp" />
      </ListItem>
      <ListItem>
        <Switch color="primary" />
        <ListItemText primary="waterTemp" />
      </ListItem>
    </List>
  );
};

export default MetricsList;
