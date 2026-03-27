import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Layout.css';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
