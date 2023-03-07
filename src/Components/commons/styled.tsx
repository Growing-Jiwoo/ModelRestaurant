import styled from 'styled-components';

export const LodingUiStyle = styled.div`
  #loading_container {
  }
  #lodingBody {
    width: 100vw;
    height: 100vh;
    position: absolute;

    background-color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
  }
  #spinner {
  }
`;

export const SidebarStyle = styled.div`
  .sideBar {
    position: fixed;
    right: 50%;
    top: 50%;
    margin-right: -720px;
    text-align: center;
    width: 120px;
    background-color: #f2f2f2;
    word-wrap: break-word;
    z-index: 2;
  }
`;
