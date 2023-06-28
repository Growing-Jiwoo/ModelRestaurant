import { AppContainer, ContentContainer } from './styled';
import { ThemeProvider } from 'styled-components';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './pages/Main';
import LoginUi from './pages/SignIn';
import Map from './pages/Map';
import RestaurantList from './pages/RestaurantList';
import NavBar from './components/commons/Navbar';
import Footer from './components/commons/Footer';
import theme from './style/theme';
import DetailInfo from './pages/DetailInfo';
import ChartLayout from './pages/RestaurantRankChart';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <ContentContainer>
          <Routes>
            <Route path="/" element={<LoginUi />} />
            <Route element={<CommonLayout />}>
              <Route path="/home" element={<MainLayout />} />
              <Route path="/map" element={<Map />} />
              <Route path="/list" element={<RestaurantList />} />
              <Route path="/list/:id" element={<DetailInfo />} />
              <Route path="/chart" element={<ChartLayout />} />
            </Route>
          </Routes>
        </ContentContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

const CommonLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
