import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Stack } from '@mui/material';
import Link from 'next/link';
import CookieManager from '../Cookies/Cookies.js';

const pages = [
  { name: 'Tus campañas', url: '/UserCampaigns' },
  { name: 'Buscar campaña', url: '/SearchCampaign' },
  { name: 'Tus personajes', url: '/Characters' }
];
const settingsUrls2 = [
  { name: 'Profile', url: '/Profile' },
  { name: 'Reviews', url: '/Reviews' },
];

const GetUser = async () => {
  try {
    const userId = CookieManager.getCookie("id");

    if (!userId) {
      console.error('No UserId found in cookies');
      return null;
    }

    const requestBody = {
      UserId: userId
    };

    const response = await fetch('http://localhost:8000/GetUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();

    if (!data.User.Imagen || !data.User.ImageData) {
      throw new Error('Image data is missing');
    }

    // Convert LongBlob to base64 string
    const base64Image = `data:${data.User.ImageData};base64,${Buffer.from(data.User.Imagen).toString('base64')}`;

    const user = {
      ...data,
      profileImage: base64Image
    };

    return user;
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const userData = await GetUser();

      setUser(userData);
    };

    fetchUser();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleSetCookie=(event)=>{

    CookieManager.setCookie("IdP",user?.User?.idUser,365)
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MISSIONBOARD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <a href={page.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </a>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MISSIONBOARD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.url}
                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={2} sx={{ display: "flex", alignItems: "center", pt: 4, pb: 4 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {user && user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                  ) : (
                    <Typography>No active session</Typography>
                  )}
                </IconButton>
              </Tooltip>
              {user ? (
                <Typography>{user.User.Nombre}</Typography>
              ) : (
                <Typography>No active session</Typography>
              )}
            </Stack>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
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
              {settingsUrls2.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                  <Button onClick={() => {
  handleSetCookie();
  console.log("ItHappened");
  window.location.href = setting.url;
}}>
  <Typography textAlign="center">{setting.name}</Typography>
</Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
