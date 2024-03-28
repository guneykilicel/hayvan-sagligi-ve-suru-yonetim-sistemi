import { Link, NavLink } from "react-router-dom";
import { 
  HomeOutlined as HomeIcon, 
  Person2Outlined as PersonIcon, 
  CategoryOutlined as CategoryIcon, 
  ChangeHistoryOutlined as ChangeHistoryIcon, 
  CircleOutlined as CircleIcon, 
  ExitToAppOutlined as ExitToAppIcon, 
  AssessmentOutlined as AssessmentIcon, 
  PostAddOutlined as PostAddIcon, 
  ReceiptLongOutlined as ReceiptLongIcon, 
  CalendarMonthOutlined as CalendarMonthIcon 
} from '@mui/icons-material';

import "./Menu.scss";

const menuItems = [
  {
    title: "Başlıca",
    items: [
      { path: "/", title: "Anasayfa", icon: HomeIcon },
      { path: "/profile", title: "Profil", icon: PersonIcon }
    ]
  },
  {
    title: "Listeler",
    items: [
      { path: "/animals", title: "Çiftlik Listem", icon: CategoryIcon },
      { path: "/animals", title: "Dişi Hayvanlarım", icon: CircleIcon },
      { path: "/animals", title: "Erkek Hayvanlarım", icon: ChangeHistoryIcon },
      { path: "/animals", title: "Ayrılan Hayvanlarım", icon: ExitToAppIcon }
    ]
  },
  {
    title: "Raporlar",
    items: [
      { path: "/rasyon", title: "Rasyon", icon: PostAddIcon },
      { path: "/rapor", title: "Rapor", icon: ReceiptLongIcon },
      { path: "/users", title: "Aşı Takvimim", icon: CalendarMonthIcon }
    ]
  }
];

const Menu = () => {
  return (
    <div className="menu">
      {menuItems.map((group, index) => (
        <div key={index} className="item">
          <span className="title">{group.title}</span>
          {group.items.map((item, idx) => (
            <NavLink key={idx} to={item.path} className="listItem" activeClassName="selected">
              <item.icon />
              <span className="listItemTitle">{item.title}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
