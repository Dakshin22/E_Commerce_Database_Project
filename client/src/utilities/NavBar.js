import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Icon} from '@mui/material';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar(props) {
  const theme = useTheme();
  const logout = () =>
  {
    props.setUser({isLoggedIn: false, username: null})
    navigate('/');
  }

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Grocery Store
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {props.userInfo.username ? `Hi ${props.userInfo.username}!`:''}
            <ShoppingCartIcon />
          </IconButton>
          {
            props.userInfo.isLoggedIn?

          <Button color="inherit" onClick= {logout}>Logout</Button>
          :
          <Button color="inherit" href = "/">Login</Button>
        
        }
        </Toolbar>
      </AppBar>
    </Box>
  );
}