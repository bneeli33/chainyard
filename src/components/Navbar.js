import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  MenuList,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 'auto'
  },
  menuItem: {
    marginRight: theme.spacing(2)
  }
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" edge="start" className={classes.menuItem}>
            ChainYard
          </Typography>
          <Divider orientation="vertical" flexItem />
          <MenuList>
            <MenuItem
              color="primary"
              variant="contained"
              component={Link}
              to={'/blocks'}
            >
              Block
            </MenuItem>
          </MenuList>
          <MenuList>
            <MenuItem
              color="primary"
              variant="contained"
              component={Link}
              to={'/transactions'}
            >
              Transactions
            </MenuItem>
          </MenuList>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
