import React from 'react'
import { useAuth } from '../context/AuthContext';

export const Layout = ({children}) => {
  const {isAuthenticated} = useAuth();
  const background = `${isAuthenticated ? "fondo-privado" : "fondo-publico" }`
  return (
    <main className={`${background} `}>
      <div className=''>
          {children}
      </div>
    
    </main>
  )
}

