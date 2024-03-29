import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SearchUi from '../commons/SearchUi';
import { useCookies } from 'react-cookie';
import { LogoutButton } from './styled';
import { submitViewCntData } from '../../util/submitViewCnt';

function NavBar() {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['jwt']);

  const handleLogout = async () => {
    try {
      await submitViewCntData();
      localStorage.removeItem('viewCnt');
      removeCookie('jwt');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/home">
            <img
              className="main_banner_logo"
              alt="homelogo"
              style={{ width: '200px' }}
              src={require('../../assets/img/mainLogo.PNG')}
            />
          </Navbar.Brand>
          <Nav className="me-auto">
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
            <Nav.Link
              onClick={() => {
                navigate('/chart');
              }}
            >
              chart
            </Nav.Link>
          </Nav>
          <SearchUi />
        </Container>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Navbar>
    </>
  );
}

export default NavBar;
