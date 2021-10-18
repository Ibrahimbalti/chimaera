import React from "react";
// import { Container, Row } from "react-bootstrap";
// import Icon from "@mdi/react";
// import { mdiSettingsTransferOutline, mdiLogout } from "@mdi/js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "../../container/custom";
import { logout } from "../../actions/authAction";

class Footer extends React.Component {
  state = {
    sidebarOpen: false
  };
  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };
  handleLogout = () => {
    this.props.logout(this.props.history);
  };
  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default connect(null, { logout })(withRouter(Footer));
