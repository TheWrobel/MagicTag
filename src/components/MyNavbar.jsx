import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function MyNavbar({ ...props }) {
  const logout = () => {
    props.setHeaders({});
    props.setLoged(false);
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="Navbar">
      <Navbar bg="dark" variant="dark">
        <Container style={{ maxWidth: '1000px', margin: 'auto' }}>
          <Navbar.Brand href="#"> </Navbar.Brand>
          <Nav className="me-auto" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <LinkContainer to="/">
                <Nav.Link>Tag</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Tag-list">
                <Nav.Link>Tag List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/New-tag">
                <Nav.Link>New Tag</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Device-List">
                <Nav.Link>Device List</Nav.Link>
              </LinkContainer>
            </div>
            <div style={{ alignSelf: 'flex-end' }}>
              {props.loged ? <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link> : null}
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
