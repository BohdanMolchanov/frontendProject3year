import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";
import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";

const NavBar = ({ currentUser }) => {
  const logout = () => {
    authenticationService.logout();
  };
  return (
    <nav>
      <div className="navigation-link dropdown">
        <NavLink
          exact
          to="./"
          className="navigation-link home-link home-active-link"
          activeClassName="active-link"
        >
          Домашня сторінка
        </NavLink>

        <NavLink
          to="./contacts"
          className="navigation-link dropdown-content home-link"
          activeClassName="active-link"
        >
          Контакти
        </NavLink>
      </div>
      {currentUser && (
        <Fragment>
          {currentUser.employeeType === "OWNER" && (
            <Fragment>
              {!currentUser.organization ? (
                <NavLink
                  to="./registerorganization"
                  className="navigation-link"
                  activeClassName="active-link"
                >
                  Зареєструвати організацію
                </NavLink>
              ) : (
                <NavLink
                  to="./registeremployee"
                  className="navigation-link"
                  activeClassName="active-link"
                >
                  Керування співробітниками
                </NavLink>
              )}
            </Fragment>
          )}
          {currentUser.employeeType === Role.Pharmacist && (
            <div className="use-link">
              <div className="nav-link">
                <NavLink
                  to="./addcure"
                  className="navigation-link"
                  activeClassName="active-link"
                >
                  Керування ліками
                </NavLink>
              </div>
            </div>
          )}
        </Fragment>
      )}

      {currentUser ? (
        <div className="authorize">
          <div className="nav-link">
            <NavLink
              to="./login"
              onClick={logout}
              activeClassName="active-link"
              className="navigation-link"
            >
              Вийти
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="authorize">
          <NavLink
            to="./login"
            activeClassName="active-link"
            className="navigation-link"
          >
            Увійти
          </NavLink>
          <NavLink
            to="./register"
            activeClassName="active-link"
            className="navigation-link"
          >
            Зареєструватися
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export { NavBar };
