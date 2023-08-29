import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {

 return (

   <Navbar expand="lg" className="custom-navbar" variant="dark">
      <Container>
         <Navbar.Brand className="custom-navbar-brand">MyFlix</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

            { !user && (
               <Nav variant="pills">
                  <Nav.Item>
                     <Nav.Link eventKey="1" className="text-light" as={Link} to="/login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link eventKey="2" className="text-light" as={Link} to="/register">Register</Nav.Link>
                  </Nav.Item>
               </Nav>
            )}

            { user && (
               <Nav variant="pills">
                  <Nav.Item>
                     <Nav.Link eventKey="1" className="text-light" as={Link} to="/">Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link eventKey="2" className="text-light" as={Link} to="/profile">Profile</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                     <Nav.Link eventKey="3" className="text-light" onClick={onLoggedOut}>Logout</Nav.Link>
                  </Nav.Item>
               </Nav>
            )}

         </Navbar.Collapse>
      </Container>
   </Navbar>
 );
};