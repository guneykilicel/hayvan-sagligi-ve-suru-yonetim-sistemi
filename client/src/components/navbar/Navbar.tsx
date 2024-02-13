import React, { useContext, useEffect, useState } from 'react';
import './navbar.scss';
import { AuthContext } from '../../context/AuthContext';
import NotificationCard from '../notificationCard/NotificationCard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';

interface NavbarProps {
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(isDarkMode);
  }, [isDarkMode]);

  const toggleMode = () => {
    toggleDarkMode();
    setIsDarkMode(prevIsDarkMode => !prevIsDarkMode);
  }


  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.png" alt="" />
        <span>Hayvan Sağlığı ve Sürü Yonetim Sistemi</span>
      </div>
      <div className="icons">
        <IconButton className='icon-button' aria-label="mode" size="large" onClick={toggleMode}>
          {isDarkMode ? (
            <DarkModeIcon className='icon'/>
          ) : (
            <LightModeIcon className='icon' />
          )}
        </IconButton>
        <NotificationCard />
        <div className="user">
          <span>{user?.farmerFullName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;