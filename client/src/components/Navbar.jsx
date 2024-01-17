import React from 'react';
//  importing MUI components
import {
  ShoppingCartSharpIcon,
  Tooltip,
  Avatar,
  MenuIcon,
  Menu,
  IconButton,
  Toolbar,
  AppBar,
  MenuItem,
  Typography,
  Box,
  Container,
} from '../mui';
//  importing special css
import '../index.css';
//  importing logo
import logo from '../assets/nike-4-logo-svgrepo-com.svg';

import { useAuth } from '../context/AuthContext ';
import { Link as RouterLink } from 'react-router-dom';

const pages = [
  {
    path: '/products',
    text: 'Products',
  },
  {
    path: '/checkout',
    text: 'Checkout',
  },
  {
    path: '/about',
    text: 'About',
  },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const { user, clearTokens } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    clearTokens();
  };
  return (
    user && (
      <AppBar
        position='static'
        style={{
          background: 'none',
          color: 'black',
          boxShadow: 'box-shadow: 0px 2px 0px 0px #444',
          padding: '10px 0',
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <RouterLink className='link' to='/'>
              <Typography
                variant='h2'
                component={'h2'}
                noWrap
                sx={{
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                OLEX
              </Typography>
            </RouterLink>

            {/*  small screens */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseNavMenu}
                    style={{
                      padding: '20px 0',
                      width: '150px',
                      textAlign: 'center',
                    }}
                  >
                    <RouterLink
                      className='link'
                      to={page.path}
                      variant='h4'
                      component='h4'
                      style={{ color: '#888', paddingLeft: '10px  ' }}
                    >
                      {page.text}
                    </RouterLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'flex',
                  md: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                },
              }}
            >
              <RouterLink className='link' to='/'>
                <Typography
                  variant='h3'
                  noWrap
                  sx={{
                    mr: 2,
                    display: {
                      xs: 'flex',
                      md: 'none',
                    },
                    flexGrow: 1,
                  }}
                >
                  OLEX
                </Typography>
              </RouterLink>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  md: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '50px',
                },
              }}
            >
              {pages.map((page, index) => (
                <RouterLink
                  className='link'
                  variant='body2'
                  key={index}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                >
                  {page.text}
                </RouterLink>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '80px',
              }}
            >
              <Tooltip
                title='Open settings'
                disableTouchListener
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  '&:hover': {
                    backgroundColor: 'none', // Remove hover effect
                  },
                  '&:active': {
                    backgroundColor: 'none', // Remove click effect
                  },
                }}
              >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' /> */}
                  <ShoppingCartSharpIcon fontSize='large' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === 'Logout' ? handleLogout : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
  );
}
export default Navbar;
