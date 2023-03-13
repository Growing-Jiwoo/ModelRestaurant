import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { BannerLogoStyle } from './styled';
import { useNavigate } from 'react-router-dom';
import useNearRestaurangList from '../../Hooks/useNearRestaurangList';

function ControlledCarousel() {
  const [index, setIndex] = useState<number>(0);
  const getNearRestaurangList = useNearRestaurangList(null);
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (getNearRestaurangList.length !== 0) {
      console.log(getNearRestaurangList);
      setCount(getNearRestaurangList.length);
    }
  }, [getNearRestaurangList]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  function handleOnClick() {
    if (count !== 0) {
      const randomNum = Math.floor(Math.random() * count) + 1;
      navigate(`/list/${randomNum}`);
    }
  }

  return (
    <div>
      <BannerLogoStyle>
        <Carousel id="Carousel" activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="random_banner"
              alt="bannerLogo"
              src={`${process.env.PUBLIC_URL}/img/randomBanner.PNG`}
              onClick={() => {
                handleOnClick();
              }}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="rank_banner"
              alt="bannerLogo"
              src={`${process.env.PUBLIC_URL}/img/rankBanner.PNG`}
            />
          </Carousel.Item>
        </Carousel>
      </BannerLogoStyle>
    </div>
  );
}

export default ControlledCarousel;
