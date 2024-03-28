import React, { useContext, useEffect, useState } from 'react';
import './navbar.scss';
import { AuthContext } from '../../context/AuthContext';
import NotificationCard from '../notificationCard/NotificationCard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import { ThemeContext } from '../../context/ThemeContext';


const Navbar = () => {

  const { user } = useContext(AuthContext);

  const {theme, setTheme} = useContext(ThemeContext);


  return (
    <div className={`navbar ${theme}`}>
      <div className="logo background text">
        <img src="logo.png" alt="" />
        <span>Hayvan Sağlığı ve Sürü Yonetim Sistemi</span>
      </div>
      <div className="icons background text">
        <IconButton className='icon-button' aria-label="mode" size="large" onClick={()=> setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? (
            <DarkModeIcon className='icon'/>
          ) : (
            <LightModeIcon className='icon' />
          )}
        </IconButton>
        <NotificationCard />
        <div className="user text">
          <span>{user?.farmerFullName}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;