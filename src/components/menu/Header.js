import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import uuid from "react-uuid";

import "./Header.css";

const Header = (props) => {
  const { data } = props;
  const isShrinkMenu = useMediaQuery({
    query: `(max-width: ${data.breakPoints?.menu || "800px"})`,
  });
  const [isMenuActive, setIsMenuActive] = useState(false);
  const getLinks = () => {
    return (
      <>
        {isMenuActive && (
          <div
            className="grey-screen"
            onClick={() => setIsMenuActive(false)}
          ></div>
        )}
        <ul
          className={
            isShrinkMenu
              ? `mobile-nav ${isMenuActive ? "open" : "close"}`
              : "header-links"
          }
        >
          {data.headerLinks.map((link) => (
            <li key={uuid()} className="header-link" id={`link-${link}`}>
              <NavLink onClick={() => setIsMenuActive(false)} to={`/${link}`}>
                {link}
              </NavLink>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <header className="header">
        <div className="text-header">
          <NavLink to="/">
            <h4>{data.title}</h4>
            <p>{data.subtitle}</p>
          </NavLink>
        </div>
        {isShrinkMenu ? (
          <Hamburger
            size="24"
            toggled={isMenuActive}
            toggle={setIsMenuActive}
          />
        ) : (
          <nav>{getLinks()}</nav>
        )}
      </header>
      {isShrinkMenu && <nav>{getLinks()}</nav>}
    </>
  );
};

export default Header;
