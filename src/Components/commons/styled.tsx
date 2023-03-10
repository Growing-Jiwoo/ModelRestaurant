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

export const DirectionInput = styled.input`
  width: 270px;
  height: 40px;
  border: 0px;
  border-bottom: 1px solid #222228;
  font-size: 14px;
  color: #222222;
  background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
`;

export const DirectionInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DirectionInputImage = styled.div`
  width: 40px;
  height: 40px;
  border-bottom: 1px solid #222228;
  background: url('https://s3-ap-northeast-1.amazonaws.com/dcicons/new/images/web/common/search@2x.png');
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: left;
  cursor: pointer;
`;

export const FooterStyle = styled.footer`
  footer {
    position: absolute;
    height: 60px;
    width: 100%;
    padding: 0 25px;
    line-height: 60px;
    color: #8a8c8f;
    border-top: 1px solid #dee5e7;
    background-color: #f2f2f2;
    text-align: center;
  }
`;
