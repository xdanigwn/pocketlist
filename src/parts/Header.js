import React from "react";
import Button from "elements/Button";
import IconLogo from "parts/IconLogo";
import IconProfile from "parts/IconProfile";
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default function Header(props) {
  const getNavLinkClass = (path) => {
    return props.location.pathname === path ? " active" : "";
  };

  return (
    <div>
      <header className="spacing-sm">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <IconLogo />

            <Button className="navbar-toggler"></Button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav m-auto">
                <li className={`nav-item${getNavLinkClass("/")}`}>
                  <Button className="nav-link" type="link" href="/">
                    Overview
                  </Button>
                </li>
                <li className={`nav-item${getNavLinkClass("/report")}`}>
                  <Button
                    className="nav-link"
                    type="link"
                    href="/report"
                    hasShadow
                  >
                    Reports
                  </Button>
                </li>
                {/* <li className={`nav-item${getNavLinkClass("/settings")}`}>
                  <Button className="nav-link" type="link" href="/settings">
                    Settings
                  </Button>
                </li> */}
              </ul>
              <div className="box-profile">
                <IconProfile />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
