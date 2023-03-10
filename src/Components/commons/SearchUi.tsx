import { useState } from 'react';
import styled from 'styled-components';
import useGeoLocation from '../../Utils/useGeolocation';

const DirectionInput = styled.input`
  width: 270px;
  height: 40px;
  border: 0px;
  border-bottom: 1px solid #222228;
  font-size: 14px;
  color: #222222;
  background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;
`;

const DirectionInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DirectionInputImage = styled.div`
  width: 40px;
  height: 40px;
  border-bottom: 1px solid #222228;
  background: url('https://s3-ap-northeast-1.amazonaws.com/dcicons/new/images/web/common/search@2x.png');
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: left;
  cursor: pointer;
`;

interface Coordinates {
  lat: number;
  lng: number;
  address: string;
  place: string;
}

interface Location {
  loaded: boolean;
  coordinates?: Coordinates;
  error?: {
    code: number;
    message: string;
  };
}

function insertDestination(destination: string, data: Location) {
  if (data.loaded === true) {
    console.log(`출발지: ${data.coordinates?.place} / 도착지: ${destination} `);
    window.open(
      `https://map.kakao.com/?sName=${data.coordinates?.place}&eName=${destination}`,
      '_blank'
    );
  } else {
    alert('잠시만 기다려주세요.');
  }
}

function SearchComponent(): JSX.Element {
  const location = useGeoLocation();
  const [destination, setDestination] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleDirectionInputClick = () => {
    insertDestination(destination, location);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      insertDestination(destination, location);
    }
  };

  return (
    <DirectionInputContainer>
      <DirectionInputImage onClick={handleDirectionInputClick} />
      <DirectionInput
        value={destination}
        onChange={handleInputChange}
        placeholder="목적지를 입력하여 길을 찾으세요."
        onKeyDown={handleKeyDown}
      />
    </DirectionInputContainer>
  );
}

export default SearchComponent;
