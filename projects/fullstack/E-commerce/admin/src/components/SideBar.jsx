import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Sidebar.css';
import { useState } from 'react';
function SideBar() {
  
  return (
    <>
      <nav className="sidebar">
        <ul className="sidebar-nav-container">
          <NavLink className={'sidebar-nav-item'} to="/add">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </NavLink>
          <NavLink className={'sidebar-nav-item'} to="/list">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </NavLink>
          <NavLink className={'sidebar-nav-item'} to="/orders">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
          </NavLink>
        </ul>
      </nav>
    </>
  );
}

export default SideBar;
