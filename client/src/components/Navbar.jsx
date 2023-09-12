import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// import {BiChevronDown} from "react-icons"

import logo2 from "../assets/img/Logo2.png"

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
      <nav className="navbar  navbar-expand-md border-bottom">
        <div className=' relative left-0 top-0 '> 
          <Link to={isAuthenticated ? "/tasks" : "/"}>
            <img className='w-40' src={logo2} alt="" />
          </Link>
        </div>
        <div className='container '>
          <button
            className={`navbar-toggler ${collapsed ? '' : 'collapsed'}`}
            type="button"
            onClick={toggleNavbar}
            aria-expanded={!collapsed ? 'true' : 'false'}
            >
            <span className="navbar-toggler-icon bg-pink-500 "></span>
          </button>
          <div className={`collapse navbar-collapse my-custom-collapse-class ${collapsed ? '' : 'show'}`}>
            <ul className="navbar-nav ml-auto gap-x-5">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <FontAwesomeIcon className="mr-2 mt-3 " icon={faPenToSquare} />
                    Que actividades tienes para hoy {user.nombre}?
                  </li>
                  <li className="nav-item">
                    <Link to='/add-task' className='nav-link nav-login-register rounded-4  px-4 py-2'>Nueva actividad</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/' onClick={() => { logout(); }} className='nav-link  nav-link nav-login-register rounded-4  px-4 py-2'>Cerrar sesion</Link>
                  </li>


                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to='/login' className=' nav-login-register  rounded-4 px-4 py-2'>Iniciar sesion</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/register' className=' nav-login-register rounded-4 px-4 py-2'>Registro</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>        
      </nav>

  );
}

export default Navbar;