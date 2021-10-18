import React from "react";
import {Link} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <section id="header" className="fixed-top bg-dark">
          <div className="container">
          <nav className="navbar navbar-expand-md navbar-dark">
            <Link to="/" className="navbar-brand">
              <img src="/img/with-text.png" height="28" alt="CoolBrand" />
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            { !this.props.step &&
            <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ml-auto">
              <Link to="/signin" className="nav-item nav-link link1">
                  sign in
              </Link>
              <Link to="/signup" className="nav-item nav-link link2">
                sign up
              </Link>
            </div>
          </div>

            }
          </nav>
        </div>
    </section>
    );
  }
}

export default Header;
