import { useEffect, useState } from 'react';
import { MainBannerImg } from '../components/main/MainBannerImg';
import { NearRestaurantRank } from '../components/main/NearRestaurantRank';

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

  return showBanner ? <MainBannerImg /> : <NearRestaurantRank />;
}

export default MainComponent;
