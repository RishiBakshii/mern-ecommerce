import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { Badge, Button, Chip, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../user/UserSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectCartItems } from '../../cart/CartSlice';
import { selectLoggedInUser } from '../../auth/AuthSlice';



export const Navbar=()=> {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo=useSelector(selectUserInfo)
  const cartItems=useSelector(selectCartItems)
  const loggedInUser=useSelector(selectLoggedInUser)
  const navigate=useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {name:'Profile',to:loggedInUser?.isAdmin?"/admin/profile":"/profile"},
    {name:loggedInUser?.isAdmin?'Orders':'My orders',to:loggedInUser?.isAdmin?"/admin/orders":"/orders"},
    {name:'Logout',to:"/logout"},
  ];

  return (
    <AppBar position="sticky">
        <Toolbar sx={{p:1,height:"4rem",display:"flex",justifyContent:"space-around"}}>

          <Typography variant="h6" noWrap component="a" href="/" sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none', }}>
            ECOMMERCE
          </Typography>



          <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} columnGap={2}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo?.name} src="null" />
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
                loggedInUser?.isAdmin && 
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to="/admin/add-product" textAlign="center">Add new Product</Typography>
                </MenuItem>
              
              }
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography component={Link} color={'text.primary'} sx={{textDecoration:"none"}} to={setting.to} textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Typography variant='h6' fontWeight={300}>Hey👋, {userInfo?.name} </Typography>
            {loggedInUser.isAdmin && <Button variant='contained'>Admin</Button>}

            {cartItems?.length>0 && <Badge  badgeContent={cartItems.length} color='error'>
              <IconButton onClick={()=>navigate("/cart")}>
                <ShoppingCartOutlinedIcon sx={{color:'white'}}/>
                </IconButton>
            </Badge>}
          </Stack>

        </Toolbar>
    </AppBar>
  );
}