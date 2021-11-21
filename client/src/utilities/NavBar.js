import React, { useState } from "react";
import {
  AppBar,
  Menu,
  MenuItem,
  Box,
  Grid,
  Paper,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Icon,
} from "@mui/material";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const logout = () => {
    props.setUser({ isLoggedIn: false, username: null });
    navigate("/");
  };

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick = {() => {navigate('/itemsPage')}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Grocery Store
          </Typography>
          {props.userInfo.username ? `Hi ${props.userInfo.username}!` : ""}
          {props.userInfo.isLoggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/myCart");
                    handleClose();
                  }}
                >
                  My Cart
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/itemsPage");
                    handleClose();
                  }}
                >
                  Shop Items
                </MenuItem>
              </Menu>
            </div>
          )}

          {props.userInfo.isLoggedIn ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" href="/">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
