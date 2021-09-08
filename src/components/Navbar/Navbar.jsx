import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
import { useHistory } from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';

function NavigationBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);

    const [searchTerm, setSearchTerm] = useState('');

    const search = (action) => {
        dispatch({
            type: 'FETCH_SEARCH',
            payload: searchTerm
        })
        // redirect to the search page
        history.push('/search');
    }

    return (
        <>
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/home">Profile</Nav.Link>
              <LinkContainer to="/search">
                <Nav.Link>Search</Nav.Link>
              </LinkContainer>
              <Nav.Link>Cart</Nav.Link>
              {user.id ? 
              <Nav.Link href="/logout">Logout</Nav.Link> : 
              <Nav.Link href="/login">Login</Nav.Link>}
              <Nav.Link href="/about">About</Nav.Link>
              
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
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        </>
    );
}

export default NavigationBar