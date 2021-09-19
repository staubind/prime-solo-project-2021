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

function NavigationBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    const cart = useSelector((store) => store.cartReducer)
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
                  <Nav.Link>Favorites</Nav.Link>
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

export default NavigationBar