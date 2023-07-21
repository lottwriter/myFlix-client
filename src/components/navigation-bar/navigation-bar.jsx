import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    console.log(user + `user`);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
           MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
                <>
                    <Nav.Link as={Link} to='/login'>
                        Login
                    </Nav.Link>
                    <Nav.Link as={Link} to='/signup'>
                        Signup
                    </Nav.Link>
                   
                </>
            )}
            {user && (
                <>
                <Nav.Link as={Link} to='/'>
                    Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} as={Link} to='/login'>Logout</Nav.Link>
                <Nav.Link as={Link} to={`/${encodeURIComponent(user._id)}/profile`}>
                        Profile
                    </Nav.Link>
                </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};