import { MainBanner, MainBannerImage } from './styled';

export function MainBannerImg(): JSX.Element {
  return (
    <MainBanner>
      <MainBannerImage
        src={require(`../../assets/img/bannerLogo.PNG`)}
        alt="bannerLogo"
      />
    </MainBanner>
  );
}
