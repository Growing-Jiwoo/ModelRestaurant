import { useEffect, useState } from 'react';
import ControlledCarousel from './MainCarousel';
import RestaurantCardList from './RestaurantCardList';
import Sidebar from '../commons/Sidebar';
import { MainDisplay, MainBanner, MainBannerImage } from './styled';

function MainBannerImg(): JSX.Element {
  return (
    <MainBanner>
      <MainBannerImage
        src={process.env.PUBLIC_URL + '/img/bannerLogo.PNG'}
        alt="bannerLogo"
      />
    </MainBanner>
  );
}

function HomeUi(): JSX.Element {
  return (
    <MainDisplay>
      <ControlledCarousel />
      <RestaurantCardList />
      <Sidebar />
    </MainDisplay>
  );
}

function MainComponent(): JSX.Element {
  const [showBanner, setShowBanner] = useState<boolean>(
    !localStorage.getItem('bannerDisplayed')
  );

  useEffect(() => {
    if (showBanner) {
      localStorage.setItem('bannerDisplayed', 'true');
      const hideBannerTimeout = setTimeout(() => {
        setShowBanner(false);
      }, 2000);
      return () => clearTimeout(hideBannerTimeout);
    }
  }, [showBanner]);

  return showBanner ? <MainBannerImg /> : <HomeUi />;
}

export default MainComponent;
