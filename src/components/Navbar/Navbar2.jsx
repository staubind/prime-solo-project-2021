import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
import { useHistory } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';import ShareIcon from '@mui/icons-material/Share';

// Material UI Below, Bootstrap-React above

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  export default function PrimarySearchAppBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const cart = useSelector((store) => store.cartReducer)
    const favorites = useSelector((store) => store.favoriteReducer)
    const [searchTerm, setSearchTerm] = useState('');
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
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
        <MenuItem onClick={() => {
          dispatch({ type: 'LOGOUT' })
          handleMenuClose()}}><DirectionsRunIcon /> Logout</MenuItem>
        <MenuItem>
        <SettingsIcon /> Settings
        </MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
        <LinkContainer to="/favorites">
          <IconButton size="small" aria-label="show 4 new mails" color="inherit">
              {favorites.length > 0 ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />} Favorites
          </IconButton>
          </LinkContainer>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="small"
            color="inherit"
          >
              <SearchIcon /> Search
          </IconButton>
        </MenuItem>
        <MenuItem>
          <IconButton
            size="small"
            color="inherit"
          >
            {cart.length > 0 ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />} Cart
          </IconButton>

        </MenuItem>
        <MenuItem>
          <IconButton size="small" color="inherit">
            <InfoIcon /> About
          </IconButton>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
    
  
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              GrogeryGuru
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    );
  }


function NavigationBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const cart = useSelector((store) => store.cartReducer)
    const favorites = useSelector((store) => store.favoriteReducer)
    const [searchTerm, setSearchTerm] = useState('');

    const search = (event) => {
        event.preventDefault()
        dispatch({
            type: 'SEARCH',
            payload: searchTerm
        })
        // send the search term to the display page
        setSearchTerm('');
        // redirect to the search page
        history.push('/search');
    }

    return (
        <>
        <Navbar bg="light" expand="lg" sticky="top">
          <LinkContainer to="/home">
            <Navbar.Brand>GroceryGuru</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* if nobody is logged in, we should redirect to login/register view */}
              <LinkContainer to="/favorites">
                  <Nav.Link>{favorites.length > 0 ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}Favorites</Nav.Link>
              </LinkContainer>
              {/* if nobody is logged in, we should redirect to login/register view */}
              <LinkContainer to="/search">
                <Nav.Link>Search</Nav.Link>
              </LinkContainer>
              {/* if nobody is logged in, we should redirect to login/register view */}
              <LinkContainer to="/cart">
                  <Nav.Link>{cart.length > 0 ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />} Cart</Nav.Link>
              </LinkContainer>

              {/* need links for login/logout */}
              <LinkContainer to="/search">
                  <Nav.Link onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form className="d-flex" onSubmit={search}> 
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(event) => {setSearchTerm(event.target.value)}}
              />
              <IconButton type="submit" variant="outline-success"><SearchIcon /></IconButton>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        </>
    );
}

// export default NavigationBar