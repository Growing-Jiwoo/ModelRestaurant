import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { BannerLogoStyle } from './styled';

function ControlledCarousel() {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <BannerLogoStyle>
        <Carousel id="Carousel" activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="random_banner"
              alt="bannerLogo"
              src={`${process.env.PUBLIC_URL}/img/randomBanner.PNG`}
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
