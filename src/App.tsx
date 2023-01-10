import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import GroupCard from './Components/Main_Card';
import Map from './Components/Map';
import useGeoLocation from './hooks/useGeolocation';
import axios from 'axios';
import ControlledCarousel from './Components/Main_Carousel';

import theme from './Style/theme';

const MainBanner = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  ${({ theme }) => theme.animation.slow_fadein_fadeout};
  margin-top: 23vh;
  min-height: 70vh;
`;

const MainDisplay = styled.div`
  ${({ theme }) => theme.animation.fast_fadein_fadeout};
`;

interface RestaurantType {
  addrjibun: string;
  addrroad: string;
  bsnscond: string;
  bsnsnm: string;
  gugun: string;
  id: number;
  lat: string | number;
  lon: string | number;
  menu: string;
  tel: string;
}

function App() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(true);
  const location = useGeoLocation();
  useEffect(() => {
    setBanner(false);
  }, []);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/Restaurant/')
      .then(function (response) {
        console.log(response);
        response.data.map((element: RestaurantType) => {
          if (
            location.coordinates?.address ===
            '부산 ' + element.gugun.split(' ')[1]
          ) {
            console.log(element.bsnsnm);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [location]);
  return (
    <div>
      {banner === true ? null : <NavBar />}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<MainBannerImg />}></Route>
          <Route path="/home" element={<MainComponent />}></Route>
          <Route path="/map" element={<Map />}></Route>
        </Routes>
      </ThemeProvider>
    </div>
  );

  function NavBar() {
    return (
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
          </Nav>
        </Container>
      </Navbar>
    );
  }

  function MainBannerImg() {
    useEffect(() => {
      return () => {
        setTimeout(() => {
          setBanner(false);
          navigate('/home');
        }, 2000);
        setBanner(true);
      };
    }, []);
    return (
      <div>
        <MainBanner>
          <img
            className="main_banner_image"
            alt="bannerLogo"
            src={process.env.PUBLIC_URL + '/img/bannerLogo.PNG'}
          />
        </MainBanner>
      </div>
    );
  }

  function MainComponent() {
    return (
      <div>
        <MainDisplay>
          <ControlledCarousel></ControlledCarousel>
          {/* <GroupCard userlocation={userlocation}></GroupCard> */}
          <GroupCard></GroupCard>
        </MainDisplay>
      </div>
    );
  }
}

export default App;
