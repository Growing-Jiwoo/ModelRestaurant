import { LodingUiStyle } from './styled';
import { Spinner } from 'react-bootstrap';

function LodingUi(): JSX.Element {
  return (
    <div>
      <LodingUiStyle>
        <div id="lodingBody">
          <Spinner id="spinner" animation="border" />
        </div>
      </LodingUiStyle>
    </div>
  );
}

export default LodingUi;
