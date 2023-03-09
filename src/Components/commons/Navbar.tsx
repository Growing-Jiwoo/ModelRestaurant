import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SearchUi from '../commons/SearchUi';

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              className="main_banner_logo"
              alt="homelogo"
              style={{ width: '200px' }}
              src={process.env.PUBLIC_URL + '/img/mainLogo.PNG'}
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/home');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/map');
              }}
            >
              map
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/list');
              }}
            >
              list
            </Nav.Link>
          </Nav>
          <SearchUi />
        </Container>
      </Navbar>
      {/* <Outlet /> */}
    </>
  );
}

export default NavBar;
