import React, { useState } from 'react';
import styled from "styled-components";
import Carousel from 'react-bootstrap/Carousel';

const BannerLogo = styled.div`
img{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60vw;
    height: 400px;
    margin: 0 auto;
}

.random_banner{
    cursor: pointer;
}
`;

function ControlledCarousel() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div>
            <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginTop: '20px' }}>

                <Carousel.Item>
                    <BannerLogo><img className="random_banner" alt="bannerLogo" src={process.env.PUBLIC_URL + '/img/randomBanner.PNG'} /></BannerLogo>
                </Carousel.Item>

                <Carousel.Item>
                    <BannerLogo><img className="rank_banner" alt="bannerLogo" src={process.env.PUBLIC_URL + '/img/rankBanner.PNG'} /></BannerLogo>
                </Carousel.Item>

            </Carousel>
        </div>
    );
}

export default ControlledCarousel;
