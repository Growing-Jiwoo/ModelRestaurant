import { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import MainComponent from './Components/main/HomeUi';
import Map from './Components/Map';
import RestaurantList from './Components/list/RestaurantList';
import NavBar from './Components/commons/Navbar';
import Footer from './Components/commons/Footer';
import theme from './Style/theme';
import DetailRestaurantInfo from './Components/list/DetailRestaurantInfo';

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

// function App() {
//   return (
//     <div>
//       <ThemeProvider theme={theme}>
//         <Routes>
//           <Route path="/" element={<MainBannerImg />}></Route>
//         <Route element={<NavBar />}>
//         <Route element={<Footer />}>
//           <Route path="/home" element={<MainComponent/>}></Route>
//           <Route path="/map" element={<Map />}></Route>
//           <Route path="/list" element={<RestaurantList />}></Route>
//           <Route path="/list/:id" element={<DetailRestaurantInfo />}></Route>
//           </Route>
//         </Route>
//         </Routes>
//       </ThemeProvider>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <div style={{ flex: 1 }}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<MainComponent />} />
              <Route path="/map" element={<Map />} />
              <Route path="/list" element={<RestaurantList />} />
              <Route path="/list/:id" element={<DetailRestaurantInfo />} />
            </Route>
            <Route path="/" element={<MainBannerImg />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
