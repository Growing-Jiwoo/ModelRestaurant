import React, { useEffect, useRef, useState } from 'react';
import theme from '../../Style/theme';
import useNearRestaurangList from '../../Utils/useNearRestaurangList';
import useGeoLocation from '../../Utils/useGeolocation';
import Paging from '../../Utils/paging';
import { CardStyle } from './styled';
import type { RestaurantType } from '../../Type/interface';

function GroupCard(): JSX.Element {
  const getNearRestaurangList = useNearRestaurangList(null);
  const location = useGeoLocation();
  const [count, setCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postPerPage, setPostPerPage] = useState<number>(5);
  const [indexOfLastPost, setIndexOfLastPost] = useState<number>(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = useState<number>(0);
  const scrollRef: React.RefObject<HTMLDivElement> = useRef(null);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  function CardComponent(): JSX.Element | undefined | any {
    const userLocationName = location.coordinates?.address;
    const [currentPosts, setCurrentPosts] = useState<RestaurantType[]>([]);

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
      if (getNearRestaurangList.length !== 0) {
        console.log(getNearRestaurangList.length);

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
      } else if (getNearRestaurangList.length === 0) {
        console.log('주변 음식점 목록을 불러오는 중입니다.');
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

  return <CardComponent />;
}

export default GroupCard;
