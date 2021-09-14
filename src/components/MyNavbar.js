import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap';


const MyNavbar = ({...props}) => {
    const handleLogout = () => {
        logout()
    }
    const logout = () => {
        props.setHeaders({})
        props.setLoged(false);
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container style={{maxWidth: "1000px", margin: "auto"}}>
                    <Navbar.Brand href="#"> </Navbar.Brand>
                    <Nav className="me-auto" style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                        <div style={{display: "flex"}}>
                        <LinkContainer to="/">
                        <Nav.Link>Tag</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/Tag-list">
                        <Nav.Link>Tag List</Nav.Link>
                        </LinkContainer>
                        </div>
                        <div style={{alignSelf:"flex-end"}}>
                        {props.loged ?<Nav.Link href="#" onClick={handleLogout}>Wyloguj</Nav.Link> : <Button>Zaloguj</Button>} 
                        </div>
                    </Nav>
                </Container>
            </Navbar>            
        </div>
    )
}

export default MyNavbar
