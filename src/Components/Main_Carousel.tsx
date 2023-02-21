import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

const BannerLogo = styled.div`
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60vw;
    height: 400px;
    margin: 0 auto;
  }

  .random_banner {
    cursor: pointer;
  }
`;

interface ControlledCarouselProps {
  className?: string;
}

function ControlledCarousel({ className }: ControlledCarouselProps) {
  const [index, setIndex] = useState<number>(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
    console.log(selectedIndex);
  };

  return (
    <div className={className}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        style={{ marginTop: '20px' }}
      >
        <Carousel.Item>
          <BannerLogo>
            <img
              className="random_banner"
              alt="bannerLogo"
              src={`${process.env.PUBLIC_URL}/img/randomBanner.PNG`}
            />
          </BannerLogo>
        </Carousel.Item>
        <Carousel.Item>
          <BannerLogo>
            <img
              className="rank_banner"
              alt="bannerLogo"
              src={`${process.env.PUBLIC_URL}/img/rankBanner.PNG`}
            />
          </BannerLogo>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
