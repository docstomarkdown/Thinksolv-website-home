import React from 'react';
import Header from './Header';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout">
        {children}
      </main>
    </div>
  );
};

export default Layout;
