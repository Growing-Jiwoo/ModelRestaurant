import { MainBanner, MainBannerImage } from './styled';

export function MainBannerImg(): JSX.Element {
  return (
    <MainBanner>
      <MainBannerImage
        src={process.env.PUBLIC_URL + '/img/bannerLogo.PNG'}
        alt="bannerLogo"
      />
    </MainBanner>
  );
}
