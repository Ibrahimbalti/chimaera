import React from "react";
import { bubble as Menu } from "react-burger-menu";
import "../../container/custom";
import Icon from "@mdi/react";
import {
  mdiSettingsTransferOutline,
  mdiLogout,
  mdiAccount,
  mdiAccountPlus,
  mdiHelpCircle,
  mdiAlertRhombus,
  mdiPost
} from "@mdi/js";
import { logout } from "../../actions/authAction";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class MenuCom extends React.Component {
  state = {
    isMenuOpen: false
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleLogout = () => {
    this.props.logout(this.props.history);
  };
  handleClose = () => {
    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
  };
  render() {
    return (
      <div id="menu" onClick={this.handleClose}>
        <Menu disableAutoFocus isOpen={this.state.isMenuOpen}>
          <div className="nav-menu">
            <div className="slink-url">
              <div
                className="circular--portrait"
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundImage: `url(${this.props.user.avatar ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})`
                }}
              ></div>
              <div className="url">
                <h4>{this.props.user.displayedName}</h4>
                <button
                  // href={`${this.props.user.publicURL}`}
                  // target="_blank"
                  // rel="noopener noreferrer"
                  style={{
                    textDecoration: "underline",
                    background: "none",
                    border: "none"
                  }}
                  onClick={() => {
                    window.open(`//${this.props.user.publicURL}`, "_blank");
                  }}
                >
                  What Visitor's See
                </button>
              </div>
            </div>
            <ul>
              <Link to="/user-admin">
                <li>
                  <div className="setting">
                    <div className="icon">
                      <Icon path={mdiAccount} size="24px" color="#fff" />
                    </div>
                    <div className="icon-name">
                      <h4>Profile</h4>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/add-link">
                <li>
                  <div className="setting">
                    <div className="icon">
                      <Icon path={mdiAccountPlus} size="24px" color="#fff" />
                    </div>
                    <div className="icon-name">
                      <h4>Add links</h4>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/settings">
                <li>
                  <div className="setting">
                    <div className="icon">
                      <Icon
                        path={mdiSettingsTransferOutline}
                        size="24px"
                        color="#fff"
                      />
                    </div>
                    <div className="icon-name">
                      <h4>Settings</h4>
                    </div>
                  </div>
                </li>
              </Link>
              <Link to="/smart-card">
                <li>
                  <div className="setting">
                    <div className="icon">
                      <Icon
                        path={mdiSettingsTransferOutline}
                        size="24px"
                        color="#fff"
                      />
                    </div>
                    <div className="icon-name">
                      <h4>Linked Smart Cards</h4>
                    </div>
                  </div>
                </li>
              </Link>
              {/* <Link to="/faq">
                <li>
                  <div className="setting">
                    <div className="icon">
                      <Icon path={mdiAlertRhombus} size="24px" color="#fff" />
                    </div>
                    <div className="icon-name">
                      <h4>FAQ</h4>
                    </div>
                  </div>
                </li>
              </Link> */}
              {/* <Link to="/news">
                <li>
                  <div className="setting">
                    <div className="icon">
                      <Icon path={mdiPost} size="24px" color="#fff" />
                    </div>
                    <div className="icon-name">
                      <h4>News</h4>
                    </div>
                  </div>
                </li>
              </Link> */}
              <Link to="/help">
                <li>
                  <div className="setting">
                    <div className="icon">
                      <Icon path={mdiHelpCircle} size="24px" color="#fff" />
                    </div>
                    <div className="icon-name">
                      <h4>Help</h4>
                    </div>
                  </div>
                </li>
              </Link>
              <li>
                <div className="setting" onClick={this.handleLogout}>
                  <div className="icon">
                    <Icon path={mdiLogout} size="24px" color="#fff" />
                  </div>
                  <div className="icon-name">
                    <h4 className="color">Log Out</h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Menu>
      </div>
    );
  }
}

const mapPropsToState = stroe => ({
  user: stroe.auth.user,
  err: stroe.err
});

export default connect(mapPropsToState, { logout })(withRouter(MenuCom));
