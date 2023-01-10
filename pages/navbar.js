import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import AppsIcon from '@mui/icons-material/Apps';
// import { ClassNames } from '@emotion/react';
import { useGlobalContext } from '../context/global';



export default function PrimarySearchAppBar() {
  const { SSOuser } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  // const mobileMenuId = 'primary-search-account-menu-mobile';
  // const renderMobileMenu = (
  //   <Menu
  //     anchorEl={mobileMoreAnchorEl}
  //     anchorOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     id={mobileMenuId}
  //     keepMounted
  //     transformOrigin={{
  //       vertical: 'top',
  //       horizontal: 'right',
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton size="large" aria-label="show 4 new mails" color="inherit">
  //         <Badge badgeContent={4} color="error">
  //           <MailIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Messages</p>
  //     </MenuItem>
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="show 17 new notifications"
  //         color="inherit"
  //       >
  //         <Badge badgeContent={17} color="error">
  //           <NotificationsIcon />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifications</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         size="large"
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <Box >
      <AppBar className="AppBar" sx={{background: 'white'}}>
        <Toolbar>
          <img
            src="GAccess-colored.png"
            alt="GAccess logo"
            className='GAccess'
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ ml: 1 }}
          >
            <SettingsIcon  sx={{ color: 'black', fontSize: 50, mt:0.5,mr:3}}/>
          </IconButton> */}
            {/* <IconButton size="large" aria-label="Application Icons" color="inherit">
            <AppsIcon sx={{ color: 'black', fontSize: 50, mt:0.5,mr:3 }}/>
          </IconButton> */}
            <div>
              {/* placeholder for now until we do the sso */}
              <p style={{ color: '#030303', top: 10, fontSize: 18, textAlign: 'right', position: 'relative' }}>
                {SSOuser}
              </p>
              <p style={{ color: '#848484', top: -10, fontSize: 14, textAlign: 'right', position: 'relative' }}>
                Service Admin
              </p>
            </div>


            <AccountCircle sx={{ color: 'black', fontSize: 50, mt: "9%", mr: 3, ml: 1 }} />

          </Box>
          {/* <Box  sx={{ display: { xs: 'flex', md: 'none'  } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
           
          </Box> */}
          <img
            src="company-logo.png"
            alt="company logo"
            className='company'
          />

        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {renderMenu}
    </Box>
  );
}
