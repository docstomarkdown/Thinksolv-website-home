import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/WebScraperProShell.css";

/**
 * Standalone chrome for Shopify Spy Pro — no Thinksolv site header.
 */
const ShopifySpyProShell = () => {
  return (
    <div className="wsp-shell">
      <header className="wsp-shell-header">
        <div className="wsp-shell-header-inner">
          <div className="wsp-shell-brand">
            <img
              src="/shopify-spy-logo.png"
              alt=""
              className="wsp-shell-brand-logo"
            />
            <h1 className="wsp-shell-brand-name">Shopify Spy Pro</h1>
          </div>
          <nav className="wsp-shell-nav" aria-label="Shopify Spy Pro">
            <Link
              to="/extensions/shopify-spy-pro/privacy"
              className="wsp-shell-nav-link"
            >
              Privacy
            </Link>
            <Link to="/" className="wsp-shell-nav-link wsp-shell-nav-link--muted">
              Thinksolv
            </Link>
          </nav>
        </div>
      </header>
      <main className="wsp-shell-main">
        <Outlet />
      </main>
    </div>
  );
};

export default ShopifySpyProShell;
