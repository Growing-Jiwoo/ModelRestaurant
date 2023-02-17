import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../Style/theme';
// import useNearRestaurangList from '../utils/useNearRestaurangList';
import useNearRestaurangList from '../utils/useNearRestaurangList';
import useGeoLocation from '../utils/useGeolocation';
import Paging from '../Components/paging';

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
  // const getNearRestaurangList: RestaurantList = useNearRestaurangList(); // 음식점 리스트
  const getNearRestaurangList: any = useNearRestaurangList(); // 음식점 리스트
  const location = useGeoLocation(); // 사용자 현재 주소
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const scrollRef: any = useRef(null);

  const scrollToTop = () => {
    scrollRef.scrollTop = scrollRef.scrollHeight;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    scrollRef.current.scrollIntoView;
  };

  function CardComponent(): JSX.Element | undefined | any {
    const userLocationName = location.coordinates?.address;
    const [currentPosts, setCurrentPosts] = useState([]); // 현재 페이지에서 보여지는 아이템들
    // const [currentPosts, setCurrentPosts] = useState<RestaurantList>([]);

    useEffect(() => {
      if (getNearRestaurangList) {
        setIndexOfLastPost(currentPage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(
          getNearRestaurangList.slice(indexOfFirstPost, indexOfLastPost)
        );
        setCount(getNearRestaurangList.length);
      }
    }, [currentPage, indexOfFirstPost, indexOfLastPost, postPerPage]);

    const setPage = (e: React.SetStateAction<number>) => {
      setCurrentPage(e);
    };
    {
      if (currentPosts) {
        return (
          <div>
            <CardStyle theme={theme}>
              <div className="container">
                <div id="title"> 주변 음식점 목록</div>
                {currentPosts.map((value: RestaurantType, index: number) =>
                  userLocationName == `부산 ${value.gugun.split(' ')[1]}` ? (
                    <div className="card" key={index}>
                      <div className="card_title">{value.bsnsnm}</div>
                      <div className="card_contents">
                        <img
                          className="food_img"
                          alt="food_img"
                          style={{ width: '200px' }}
                          src={
                            process.env.PUBLIC_URL + `/img/img_${value.id}.jpg`
                          }
                        />
                      </div>
                      <div className="card_footer">Tel : {value.tel}</div>
                    </div>
                  ) : null
                )}
              </div>
            </CardStyle>
            <Paging
              onClick={scrollToTop}
              page={currentPage}
              count={count}
              setPage={setPage}
            />
          </div>
        );
      } else {
        return (
          <CardStyle theme={theme}>
            <div className="container">
              <div id="title">주변 음식점 목록을 불러오는 중입니다.</div>
              <div className="card">
                <div className="card_title">title</div>
                <div className="card_contents">contents</div>
                <div className="card_footer">footer</div>
              </div>
            </div>
          </CardStyle>
        );
      }
    }
  }

  return <CardComponent></CardComponent>;
}

export default GroupCard;
