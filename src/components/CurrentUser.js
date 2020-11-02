import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { logout } from '../store/actions/authentication';

// const useStyles = makeStyles((theme) => ({
// }));

const CurrentUser = ({ currentuser, logout }) => {
  // const classes = useStyles();
  // const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} color="inherit" >
        <Avatar alt={currentuser.displayName} src={currentuser.profileImage}>
          {/* {currentuser.displayName[0]} */}
        </Avatar>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>

  );
}

const CurrentUserContainer = () => {
  const currentuser = useSelector((state) => state.currentuser);
  const dispatch = useDispatch();

  return (
    <CurrentUser 
    currentuser={currentuser}
    logout={() => dispatch(logout())} />
  );
}

export default CurrentUserContainer;