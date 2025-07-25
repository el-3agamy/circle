"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserLoggedIn } from '@/lib/slices/authSlice';
import {  useRouter } from 'next/navigation';
import { RootState } from '@/lib/store';

const pages = ['Profile', 'Posts'];
const settings = {
  loggedIn :['Profile', 'Account', 'Dashboard', 'Logout'] ,
  notLoggedIn :['Login', 'Register'] ,
};

function Navbar() {


  // const pathName = usePathname()
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null); //
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null); //


const isUserLoggedIn = useSelector((state: RootState) => state.auth.isUserLoggedIn);
const dispatch = useDispatch()



  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


const router = useRouter() ;

const logOut = ()=>{
  localStorage.removeItem("token") ; ///  I comment it for updating password
  dispatch(setIsUserLoggedIn(false))
  router.push('/login') ;

}
React.useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setIsUserLoggedIn(true));
  } else {
    dispatch(setIsUserLoggedIn(false));
  }
}, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            Circle
          </Typography>

          { isUserLoggedIn && 
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              { pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    <Link href={page === "Porfile" ? "/profile"  :"/" + page.toLowerCase() }
                      style={{textDecoration : 'none' , color : "inherit"}}
                     
                     >
                
                     {page}
                     
                     </Link>
                     
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            Circle
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {isUserLoggedIn && pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={page === " Profile" ? "/profile"  :"/" + page.toLowerCase() }
                      style={{textDecoration : 'none' , color : "inherit"}}
                
                >{page}</Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              {
                isUserLoggedIn ? 
                settings.loggedIn.map((setting) => (
                <MenuItem key={setting} onClick={()=>{handleCloseUserMenu()
                    // logoutFunction
                  if (setting === "Logout") {
                    logOut()
                    handleCloseUserMenu()}

                    // if (setting === "change Password") {
                      
                    // }
                }}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))
                :
                settings.notLoggedIn.map((setting) => (
                <MenuItem key={setting}
                 onClick={()=>{
                  handleCloseUserMenu() ;
            
                
                  
                 }}
                 >
                   <Link style={{color:"inherit" , textDecoration:"none"}} href={"/" + setting.toLowerCase()}>
                     <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                   </Link>
                </MenuItem>
              ))
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
