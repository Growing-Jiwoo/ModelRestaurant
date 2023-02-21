/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import GroupCard from './Components/main/MainCard';
import Map from './Components/Map';
import ControlledCarousel from './Components/main/MainCarousel';
import RestaurantList from './Components/list/RestaurantList';
import NavBar from './Components/commons/Navbar';
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
