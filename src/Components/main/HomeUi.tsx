import RestaurantCardList from './RestaurantCardList';
import ControlledCarousel from '../../Components/main/MainCarousel';
import styled from 'styled-components';

const MainDisplay = styled.div`
  ${({ theme }) => theme.animation.fast_fadein_fadeout};
`;

function MainComponent(): JSX.Element {
  return (
    <div>
      <MainDisplay>
        <ControlledCarousel></ControlledCarousel>
        <RestaurantCardList></RestaurantCardList>
      </MainDisplay>
    </div>
  );
}

export default MainComponent;
