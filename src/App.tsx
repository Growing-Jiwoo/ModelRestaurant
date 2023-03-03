/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainComponent from './Components/main/HomeUi';
import Map from './Components/Map';
import RestaurantList from './Components/list/RestaurantList';
import NavBar from './Components/commons/Navbar';
import theme from './Style/theme';
import DetailRestaurantInfo from './Components/list/DetailRestaurantInfo'


const MainBanner = styled.div`
  ${({ theme }) => theme.common.flexCenterColumn};
  ${({ theme }) => theme.animation.slow_fadein_fadeout};
  margin-top: 23vh;
  min-height: 70vh;
`;

function MainBannerImg() {
  const navigate = useNavigate();

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

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<MainBannerImg />}></Route>
        <Route element={<NavBar />}>
          <Route path="/home" element={<MainComponent/>}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/list" element={<RestaurantList />}></Route>
          <Route path="/list/:id" element={<DetailRestaurantInfo />}></Route>
        </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
