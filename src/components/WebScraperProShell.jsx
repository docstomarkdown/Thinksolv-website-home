import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/WebScraperProShell.css";

/**
 * Standalone chrome for /extensions/web-scraper-pro only — no Thinksolv site header.
 */
const WebScraperProShell = () => {
  return (
    <div className="wsp-shell">
      <header className="wsp-shell-header">
        <div className="wsp-shell-header-inner">
          <div className="wsp-shell-brand">
            <img
              src="/webscraper-logo.png"
              alt=""
              className="wsp-shell-brand-logo"
            />
            <h1 className="wsp-shell-brand-name">Web Scraper Pro</h1>
          </div>
          <nav className="wsp-shell-nav" aria-label="Web Scraper Pro">
            <Link
              to="/extensions/web-scraper-pro/privacy"
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

export default WebScraperProShell;
