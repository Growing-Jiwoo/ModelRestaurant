import { ThemeProvider } from 'styled-components';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainComponent from './Components/main/MainComponent';
import LoginUi from './Components/login/LoginUi';
import Map from './Components/map/Map';
import RestaurantList from './Components/list/RestaurantList';
import NavBar from './Components/commons/Navbar';
import Footer from './Components/commons/Footer';
import theme from './Style/theme';
import DetailRestaurantInfo from './Components/list/DetailRestaurantInfo';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LoginUi />} />
            <Route element={<MainLayout />}>
              <Route path="/home" element={<MainComponent />} />
              <Route path="/map" element={<Map />} />
              <Route path="/list" element={<RestaurantList />} />
              <Route path="/list/:id" element={<DetailRestaurantInfo />} />
            </Route>
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
