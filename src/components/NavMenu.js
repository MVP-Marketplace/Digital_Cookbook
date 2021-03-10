import React, {useState} from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
const NavMenu = ({setSearch, initialPlaceholder}) => {
    const [query, setQuery] = useState(initialPlaceholder)

    const onChange = event => setQuery(event.target.value)

    const onSubmit = event => {
      event.preventDefault();
      setSearch(query)
    }
    return (
 <Navbar   bg="light" expand="false">
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Brand href="/">Digital Cookbook</Navbar.Brand>
    <Dropdown  >
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        👤
      </Dropdown.Toggle>

  <Dropdown.Menu align='right' >
    <Dropdown.Item href="/login">Log In</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Log Out</Dropdown.Item>
    <Dropdown.Item href="/signup">Signup</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
      </Nav>
     <Form inline onSubmit={onSubmit} >
       <FormControl type="text" placeholder="Search" value={query} onChange={onChange} className="mr-sm-2" />
     </Form>
    </Navbar.Collapse>
</Navbar>
    )
}

export default NavMenu
