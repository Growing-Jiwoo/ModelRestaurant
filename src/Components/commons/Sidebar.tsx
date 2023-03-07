import type { RestaurantType } from '../../Type/interface';
import { SidebarStyle } from './styled';

type SidebarListProps = {
  list: RestaurantType[];
};

function SidebarList(props: SidebarListProps): JSX.Element {
  console.log(props.list);

  return (
    <div className="sideBar">
      <div>최근 본 음식점</div>
      {props.list.map((item: RestaurantType) => (
        <div key={item.id}>
          <h2>{item.bsnsnm}</h2>
          <p>{item.addrroad}</p>
        </div>
      ))}
    </div>
  );
}

function Sidebar(): JSX.Element {
  const cardData = JSON.parse(localStorage.getItem('cardData') || 'null');
  if (cardData.length !== 0) {
    console.log(cardData);
  }

  return (
    <SidebarStyle>
      {cardData.length !== 0 ? <SidebarList list={cardData} /> : <div>bye</div>}
    </SidebarStyle>
  );
}

export default Sidebar;
