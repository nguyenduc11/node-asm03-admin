import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaChrome } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { FaProductHunt } from 'react-icons/fa';
import { FaHistory } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import { FaUserPlus } from 'react-icons/fa';
import { FaUserMinus } from 'react-icons/fa';
import UserAPI from '../API/UserAPI';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Menu(props) {
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <aside
      className="left-sidebar"
      data-sidebarbg="skin6"
    >
      <div
        className="scroll-sidebar"
        data-sidebarbg="skin6"
      >
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              {' '}
              <Link
                className="sidebar-link sidebar-link"
                to="/"
              >
                <FaChrome></FaChrome>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="list-divider"></li>
            <li className="nav-small-cap">
              <span className="hide-menu">Components</span>
            </li>

            <li className="sidebar-item">
              {' '}
              <Link
                className="sidebar-link sidebar-link"
                to="/users"
              >
                <FaUserAlt></FaUserAlt>
                <span className="hide-menu">Users</span>
              </Link>
            </li>

            <li className="sidebar-item">
              {' '}
              <Link
                className="sidebar-link sidebar-link"
                to="/products"
              >
                <FaProductHunt></FaProductHunt>
                <span className="hide-menu">Products</span>
              </Link>
            </li>

            <li className="sidebar-item">
              {' '}
              <Link
                className="sidebar-link sidebar-link"
                to="/history"
              >
                <FaHistory></FaHistory>
                <span className="hide-menu">Orders History</span>
              </Link>
            </li>

            <li className="sidebar-item">
              {' '}
              <Link
                className="sidebar-link sidebar-link"
                to="/new"
              >
                <FaCartPlus></FaCartPlus>
                <span className="hide-menu">New Product</span>
              </Link>
            </li>

            <li className="list-divider"></li>
            <li className="nav-small-cap">
              <span className="hide-menu">Authentication</span>
            </li>

            <li className="sidebar-item">
              {' '}
              <Link
                className="sidebar-link sidebar-link"
                to="/login"
                aria-expanded="false"
              >
                <FaUserPlus></FaUserPlus>
                <span className="hide-menu">Login</span>
              </Link>
            </li>
            <li className="sidebar-item">
              {' '}
              <Link
                className="sidebar-link sidebar-link"
                to="/"
                aria-expanded="false"
              >
                <FaUserMinus></FaUserMinus>
                <span
                  className="hide-menu"
                  onClick={async (e) => {
                    const response = await UserAPI.postSignOut();
                    console.clear();
                    console.log(response);
                    dispatch({ type: 'LOGOUT' });
                    navigate('/login');
                  }}
                >
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
