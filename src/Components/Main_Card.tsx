import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../Style/theme';
import useNearRestaurangList from '../hooks/useNearRestaurangList';

const CardStyle = styled.div`
  * {
    color: white;
    font-weight: bold;
    text-align: center;
    overflow-wrap: break-word;
  }

  .container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    align-content: flex-start;

    position: relative;
    margin: 30px auto;
    padding: 5px 10px 20px 10px;
    max-width: 1154px;
    background-color: rgb(0, 0, 0);
  }

  .container #title {
    padding-top: 10px;
    width: 100%;
    font-size: 23px;
    text-align: center;
    top: 0px;
    left: 0px;
  }

  .card {
    width: 27%;
    height: 250px;
    border: 1px solid red;
    margin: 20px 0px 20px 0px;
  }

  .card_title {
    width: 100%;
    background-color: pink;
    flex: 1;
  }

  .card_contents {
    width: 100%;
    background-color: red;
    flex: 7;
  }

  .card_footer {
    width: 100%;
    background-color: orange;
    flex: 1;
  }
`;

function GroupCard(): JSX.Element {
  const getNearRestaurangList = useNearRestaurangList();
  const [nearList, SetNearList] = useState();

  function CardComponent() {
    return (
      <CardStyle theme={theme}>
        <div className="container">
          <div id="title">주변 음식점 목록</div>
          <div className="card">
            <div className="card_title">title</div>
            <div className="card_contents">contents</div>
            <div className="card_footer">footer</div>
          </div>
        </div>
      </CardStyle>
    );
  }

  function ConsoleLog() {
    getNearRestaurangList ? console.log('정보 있음') : console.log('정보 없음');
  }

  useEffect(() => {
    console.log(getNearRestaurangList);
  }, [getNearRestaurangList]);

  return <CardComponent></CardComponent>;
}

export default GroupCard;
