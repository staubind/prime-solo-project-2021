import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';

function NavigationBar() {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');

    const search = (action) => {
        dispatch({
            type: 'FETCH_SEARCH',
            payload: searchTerm
        })
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
              <Nav.Link href="#action2">Search</Nav.Link>
              <Nav.Link href="#">Cart</Nav.Link>
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