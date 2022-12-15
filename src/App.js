import { useState } from "react";
import styled from "styled-components";
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { Row, Col, Navbar, Container, Nav, Card, Button } from 'react-bootstrap';
const MainBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  cursor: pointer;
`;

function App() {

  let navigate = useNavigate();
  let [banner, setBanner] = useState(true)

  return (
    <div>
      {
        banner == true ? <MainBannerImg /> : <NavBar />
      }

    </div>
  );

  function MainBannerImg() {
    return (
      <div className="main_image">
        <MainBanner><img className="main_banner_image" alt="bannerLogo" src={process.env.PUBLIC_URL + '/img/bannerLogo.PNG'} onClick={() => { setBanner(false) }} /></MainBanner>
      </div>
    )
  }

}

function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}






export default App;
