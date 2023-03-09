import styled from 'styled-components';

const DirectionInput = styled.input`
  margin-left: 1.5%;
  width: 600px;
  padding-left: 45px;
  height: 60px;
  border: 0px;
  border-bottom: 1px solid #222228;
  font-size: 19px;
  color: #222222;
  background: url('https://s3-ap-northeast-1.amazonaws.com/dcicons/new/images/web/common/search@2x.png');
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: left;
`;

function SearchComponent(): JSX.Element {
  return (
    <div>
      <DirectionInput placeholder="목적지를 입력하여 길을 찾으세요." />
    </div>
  );
}

export default SearchComponent;
