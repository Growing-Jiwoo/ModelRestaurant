import { useState } from 'react';
import Modal from 'react-modal';
import { PopupContainer, PopupContent } from './styled';
import useGeoLocation from '../../Hooks/useGeolocation';
import useNearRestaurantRank from '../../Hooks/useNearRestaurantRank';
import { PopUpRankTable } from './PopUpRankTable';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
  content: {
    border: 'none',
    borderRadius: '10px',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
    padding: 0,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Popup = ({ isOpen, closeModal }: any) => {
  const location = useGeoLocation();
  const gugun = location.coordinates?.address;
  const nearRestaurantRank = useNearRestaurantRank(gugun);
  const [disabled, setDisabled] = useState(
    !!localStorage.getItem('popupDisabled')
  );

  const handleButtonClick = () => {
    setDisabled(true);
    localStorage.setItem('popupDisabled', 'true');
  };

  return (
    <Modal
      isOpen={isOpen && !disabled}
      contentLabel="Popup Modal"
      style={customStyles}
    >
      <PopupContainer>
        <button id="closebtn" onClick={closeModal}>
          X
        </button>
        <PopupContent>
          <h2>Popup Window</h2>
          <p>This is a simple popup window.</p>
          <PopUpRankTable data={nearRestaurantRank} />
          <button onClick={handleButtonClick}>오늘 하루 보지 않기</button>
        </PopupContent>
      </PopupContainer>
    </Modal>
  );
};

export default Popup;
