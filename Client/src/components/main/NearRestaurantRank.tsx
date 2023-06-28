import { useState, useEffect } from 'react';
import Sidebar from '../commons/Sidebar';
import ControlledCarousel from './MainCarousel';
import PopUp from './PopUp';
import RestaurantCardList from './RestaurantCardList';
import { MainDisplay } from './styled';

export function NearRestaurantRank(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      openModal();
    }, 4200);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <>
      <MainDisplay>
        <PopUp isOpen={isOpen} closeModal={closeModal} />
        <ControlledCarousel />
        <RestaurantCardList />
        <Sidebar />
      </MainDisplay>
    </>
  );
}
