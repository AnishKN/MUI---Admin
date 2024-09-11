import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// import Header from './components/General/Header'
// import Footer from './components/General/Footer';

function Layout() {
  const location = useLocation();
//   const pathsToHide = [
//     '/login', 
//     '/register', 
//     '/setupOne', 
//     '/setupTwo', 
//     '/setupThree',
//     '/dashboard'
//   ];

// const hideNavbar = pathsToHide.some(path => location.pathname.startsWith(path));
// const hideFooter = hideNavbar;
  

  return (
    <>
      {/* <Header hideNavbar={hideNavbar}/> */}
      <Outlet />
      {/* <Footer hideFooter={hideFooter} /> */}
    </>
  );
}

export default Layout;
