import { Link } from "react-router-dom";
import "./Menu.scss";
import { menu } from "../../data";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const Menu = () => {
  return (
    <div className="menu">

      {/* {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))} */}


      <div className="item" >
        <span className="title">Başlıca</span>
          <Link to="/" className="listItem">
            <HomeOutlinedIcon />
            <span className="listItemTitle">Anasayfa</span>
          </Link>

          <Link to="/profile" className="listItem">
            <Person2OutlinedIcon />
            <span className="listItemTitle">Profil</span>
          </Link>
      </div>
      <div className="item" >
        <span className="title">Listeler</span>
          <Link to="/animals" className="listItem">
            <CategoryOutlinedIcon />
            <span className="listItemTitle">Çiftlik Listem</span>
          </Link>

          <Link to="/animals" className="listItem">
            <CircleOutlinedIcon />
            <span className="listItemTitle">Dişi Hayvanlarım</span>
          </Link>

          <Link to="/animals" className="listItem">
            <ChangeHistoryOutlinedIcon />
            <span className="listItemTitle">Erkek Hayvanlarım</span>
          </Link>

          <Link to="/animals" className="listItem">
            <ExitToAppOutlinedIcon />
            <span className="listItemTitle">Ayrılan Hayvanlarım</span>
          </Link>
      </div>

      <div className="item" >
        <span className="title">Raporlar</span>
          <Link to="/rasyon" className="listItem">
          <PostAddOutlinedIcon />
            <span className="listItemTitle">Rasyon</span>
          </Link>

          <Link to="/rapor" className="listItem">
            <ReceiptLongOutlinedIcon />
            <span className="listItemTitle">Rapor</span>
          </Link>

          <Link to="/users" className="listItem">
            <CalendarMonthOutlinedIcon />
            <span className="listItemTitle">Aşı Takvimim</span>
          </Link>
      </div>
    </div>
  );
};

export default Menu;
