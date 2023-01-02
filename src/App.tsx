import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import GroupCard from './Components/Main_Card';
import Map from './Components/Map';
import useGeoLocation from './hooks/useGeolocation';

import ControlledCarousel from './Components/Main_Carousel';

import theme from './Style/theme';
import axios from 'axios';

const MainBanner = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  ${({ theme }) => theme.animation.slow_fadein_fadeout};
  margin-top: 23vh;
  min-height: 70vh;
`;

const MainDisplay = styled.div`
  ${({ theme }) => theme.animation.fast_fadein_fadeout};
`;

function App() {
  const navigate = useNavigate();
  const [banner, setBanner] = useState(true);
  const location = useGeoLocation();
  const [userlocation, setUserLocation] = useState<string | any>('');

  const userlat: [] | any = JSON.stringify(location.coordinates?.lng);

  async function mapAPI(latitude: unknown, longitude: unknown) {
    try {
      const response = await axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${latitude}&y=${longitude}`,
          {
            headers: {
              Authorization: 'KakaoAK 488de47883695ba1806e3203af90422a',
            },
          }
        )
        .then((response: { data: { documents: unknown[] } }) => {
          const location: any = response.data.documents[0];
          const si = location.address.region_1depth_name;
          const gu = location.address.region_2depth_name;
          const dong = location.address.region_3depth_name;
          console.log(location);
          setUserLocation(`${si} ${gu}`);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  {
    location.loaded
      ? console.log(
          mapAPI(
            JSON.stringify(location.coordinates?.lng),
            JSON.stringify(location.coordinates?.lat)
          )
        )
      : 'Location data not available yet.';
  }

  useEffect(() => {
    setTimeout(() => {
      setBanner(false);
      navigate('/home');
    }, 2000);
  }, []);
  // 수정필요 , 어떤 페이지에서건 동작을 함

  return (
    <div>
      {banner === true ? null : <NavBar />}
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<MainBannerImg />}></Route>
          <Route path="/home" element={<MainComponent />}></Route>
          <Route path="/map" element={<Map {...userlat} />}></Route>
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
      setBanner(true);
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
          <GroupCard userlocation={userlocation}></GroupCard>
        </MainDisplay>
      </div>
    );
  }
}

export default App;
