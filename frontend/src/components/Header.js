import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Header = () => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <LinkContainer to='/'>
        <Navbar.Brand>Ticket System</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          <LinkContainer to='/user'>
            <Nav.Link>User</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/admin'>
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
