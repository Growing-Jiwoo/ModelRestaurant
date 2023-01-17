import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../Style/theme';
import useNearRestaurangList from '../hooks/useNearRestaurangList';
import useGeoLocation from '../hooks/useGeolocation';

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

interface RestaurantType {
  addrjibun: string;
  addrroad: string;
  bsnscond: string;
  bsnsnm: never;
  gugun: string;
  id: number;
  lat: string | number;
  lon: string | number;
  menu: string;
  tel: string;
}

function GroupCard(): JSX.Element {
  const getNearRestaurangList: any = useNearRestaurangList();
  const location = useGeoLocation();

  function CardComponent(): JSX.Element | undefined | any {
    const userLocationName = location.coordinates?.address;
    {
      if (getNearRestaurangList) {
        return (
          <div>
            <CardStyle theme={theme}>
              <div className="container">
                <div id="title">주변 음식점 목록</div>
                {getNearRestaurangList.map(
                  (value: RestaurantType, index: number) =>
                    userLocationName == `부산 ${value.gugun.split(' ')[1]}` ? (
                      <div className="card" key={index}>
                        <div className="card_title">{value.bsnsnm}</div>
                        <div className="card_contents">
                          {value.bsnsnm}의 메인 메뉴는 {value.menu} 입니다.
                        </div>
                        <div className="card_footer">Tel : {value.tel}</div>
                      </div>
                    ) : null
                )}
              </div>
            </CardStyle>
          </div>
        );
      }
    }
  }

  return <CardComponent></CardComponent>;
}

export default GroupCard;
