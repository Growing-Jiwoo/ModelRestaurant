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
