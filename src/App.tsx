/* eslint-disable prettier/prettier */
import { useState, useEffect, useRef, useLayoutEffect, ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import GroupCard from './Components/Main_Card';
import Map from './Components/Map';
import ControlledCarousel from './Components/Main_Carousel';
import RestaurantList from './Components/Restaurant_List';
import NavBar from './Components/Navbar';

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

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<MainBannerImg />}></Route>
        <Route element={<NavBar />}>
          <Route path="/home" element={<MainComponent/>}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/list" element={<RestaurantList />}></Route>
        </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );

  function MainBannerImg() {
    useEffect(() => {
        setTimeout(() => {
          navigate('/home');
        }, 2000);
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

  function MainComponent(): JSX.Element{
    return (
      <div>
        <MainDisplay>
          <ControlledCarousel></ControlledCarousel>
          <GroupCard></GroupCard>
        </MainDisplay>
      </div>
    );
  }
}

export default App;
