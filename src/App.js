import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import {  Navbar, Container, Nav } from 'react-bootstrap';
import GroupCard from "./Components/Main_Card";
import ControlledCarousel from "./Components/Main_Carousel.js";

import display from './Style/display'

import theme from "./Style/theme.js";

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

  let navigate = useNavigate();
  let [banner, setBanner] = useState(true)

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/home" element={<NavBar />}></Route>
          <Route path="/" element={<MainBannerImg />}></Route>
        </Routes>

        {
          useEffect(() => {
            setTimeout(() => {
              setBanner(false)
              navigate('/home')
            }, 3000)
          }, [])
        }

      </ThemeProvider>
    </div>
  );

  function MainBannerImg() {
    return (
      <div>
        <MainBanner><img className="main_banner_image" alt="bannerLogo" src={process.env.PUBLIC_URL + '/img/bannerLogo.PNG'} /></MainBanner>
      </div>
    )
  }

  function NavBar() {
    return (
      <div>
        {
          useEffect(() => {
            setBanner(false)
          }, [])
        }
        <MainDisplay>

          <Navbar bg="light" variant="light">
            <Container>
              <Navbar.Brand href="/"><img className="main_banner_logo" alt="homelogo" style={{ width: '200px' }} src={process.env.PUBLIC_URL + '/img/mainLogo.PNG'} /></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => { navigate('/home') }}>Home</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <ControlledCarousel></ControlledCarousel>

          <GroupCard></GroupCard>

        </MainDisplay>
      </div>
    )
  }

}

export default App;
