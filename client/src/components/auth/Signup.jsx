import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { registeruser } from "../../actions/authAction";
import { GoogleLogin } from "react-google-login-component";
import FacebookLogin from "react-facebook-login";
import {
  login,
  googleSignin,
  facebookSignin,
  logout1
} from "../../actions/authAction";

import appConfig from "../../config/config";
import { Icon } from "antd";

class Signup extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    uuid: "",
    step: 0,
    stage: 0,
    err: {
      kind: "",
      message: ""
    }
  };
  componentWillMount() {
    this.props.logout1();
  }
  componentDidMount() {
    try {
      // const uuid = this.props.location.state.uuid;
      const uuid = localStorage.getItem("invieId");
      console.log(uuid);
      this.setState({ uuid });
    } catch (error) {}
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      const e = nextProps.err;
      if (e.email) {
        this.setState({ err: { kind: "email", message: e.email.message } });
      } else if (e.password) {
        this.setState({
          err: { kind: "password", message: e.password.message }
        });
      } else if (e.userName) {
        this.setState({
          err: { kind: "userName", message: e.userName.message }
        });
      }
    }
  }
  handleChange = e => {
    let { name, value } = e.target;
    if (name === "username") {
      value = value.replace(/\s/g, "");
    }
    this.setState({ [name]: value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const user = {};
    user.email = this.state.email;
    user.userName = this.state.username;
    user.password = this.state.password;
    user.adminId = this.state.uuid;
    let resut = await this.props.registeruser(user, this.props.history);
    if (resut) {
      this.setState({ stage: 5 });
      localStorage.removeItem("invieId");
    }
  };

  responseFacebook = async response => {
    const flag = await this.props.facebookSignin(response, this.state.uuid);
    if (flag) {
      // this.props.history.push("/user-guide");
      localStorage.removeItem("invieId");
      this.setState({ stage: 5 });
    }
  };
  responseGoogleSuccess = async response => {
    try {
      const flag = await this.props.googleSignin(
        response.getAuthResponse().id_token,
        this.state.uuid
      );
      if (flag) {
        // this.props.history.push("/user-guide");
        localStorage.removeItem("invieId");
        this.setState({ stage: 5 });
      }
    } catch (e) {}
  };
  responseGoogleFailure = error => {};
  render() {
    const { err } = this.state;
    if (this.state.stage === 0) {
      window.carousel();
      return (
        <div id="user-guide">
          <section className="step-hero">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="step text-center">
                    <img
                      src="/img/with-text.png"
                      alt="sd"
                      style={{ maxWidth: "20%" }}
                    />
                    <h2>Networking made simple.</h2>

                    <div class="owl-carousel owl-theme">
                      <div className="step-img">
                        <img src="/img/re-05.jpg" alt="" />
                        <p
                          style={{
                            fontSize: " 20px",
                            margin: "0 auto 50px",
                            maxWidth: "60%"
                          }}
                        >
                          Chimaera helps organize all your contact information
                          into one easy place
                        </p>
                      </div>
                      <div className="step-img">
                        <img src="/img/re-01.jpg" alt="" />
                        <p
                          style={{
                            fontSize: " 20px",
                            margin: "0 auto 50px",
                            maxWidth: "60%"
                          }}
                        >
                          Add your contact details, social profiles, custom
                          links and more
                        </p>
                      </div>
                      <div className="step-img">
                        <img src="/img/re-03.jpg" alt="" />
                        <p
                          style={{
                            fontSize: " 20px",
                            margin: "0 auto 50px",
                            maxWidth: "60%"
                          }}
                        >
                          With real-time clicks and page views for immediate
                          feedback on your networking efforts
                        </p>
                      </div>
                      <div className="step-img">
                        <img src="/img/re-04.jpg" alt="" />
                        <p
                          style={{
                            fontSize: " 20px",
                            margin: "0 auto 50px",
                            maxWidth: "60%"
                          }}
                        >
                          Sign up to get started
                        </p>
                      </div>
                      {/* </Carousel> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sign-group text-center">
                <div>
                  <Link
                    className="btn btn-sm mt-5 mb-2"
                    style={{
                      backgroundColor: "#FF0400",
                      color: "#fff",
                      fontSize: "20px",
                      padding: "7px 30px"
                    }}
                    to="/signup"
                    onClick={() => this.setState({ stage: 1 })}
                  >
                    Sign Up
                  </Link>
                </div>
                <Link
                  to="/signin"
                  className="btn btn-sm mt-2 mb-5"
                  style={{ fontSize: "20px", padding: "7px 30px" }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </section>
        </div>
      );
    }
    if (this.state.stage === 5) {
      return (
        <div className="container preGuid">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src="/img/with-text.png" alt="sdf" className="img-1" />
              <img src="/img/re-06.jpg" alt="sdf" className="img-2" />
              <p className="mt-3" style={{ fontSize: "18px" }}>
                Thank you for joining the Chimaera Network!
              </p>
              <button
                className="btn btn-sm mt-5 mb-5"
                style={{
                  backgroundColor: "#FF0400",
                  color: "#fff"
                }}
                onClick={() =>
                  this.setState({ flag: false }, () => {
                    this.props.history.push("/user-guide");
                  })
                }
              >
                LET’S GET STARTED!
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.stage === 1) {
      return (
        <Container>
          <Row>
            <Col md="12">
              <div className="sign-outer text-center">
                <div className="sign-inner w-100">
                  <button
                    className="signBtn"
                    onClick={() => this.setState({ stage: 3 })}
                  >
                    Sign up with email
                  </button>
                  <div className="devider"></div>
                  <div>
                    <GoogleLogin
                      socialId={appConfig.googleClientId}
                      className="google-login google-btn"
                      scope="profile email"
                      fetchBasicProfile={true}
                      responseHandler={this.responseGoogleSuccess}
                    >
                      <Icon type="google" size="22" />
                      <span className="ml-1">Sign up With Google</span>
                    </GoogleLogin>

                    <FacebookLogin
                      appId={appConfig.facebookClientId}
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      icon="fa-facebook"
                      cssClass="facebook-button"
                      textButton="Sign Up with Facebook"
                    />
                    <p
                      style={{
                        marginTop: "50px"
                      }}
                    >
                      By signing up, you agree to our
                      <Link
                        to="/terms"
                        style={{ textDecoration: "underline", color: "#000" }}
                      >
                        {" "}
                        Terms of Service{" "}
                      </Link>
                      . <br />
                      view our{" "}
                      <Link
                        to="/privacy"
                        style={{ textDecoration: "underline", color: "#000" }}
                      >
                        {" "}
                        Privacy Policy{" "}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <section id="login">
        <Container>
          <Row>
            <Col sm={6}>
              <div className="logo">
                <div className="logo-inner">
                  <Link to="/">
                    <img src="/img/with-text.png" alt="logo" />
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="form">
                <h4 className="text-center">Welcome!</h4>
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    defaultValue={this.state.email}
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {err.kind === "email" && <p>{err.message}</p>}
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    defaultValue={this.state.username}
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  {err.kind === "userName" && <p>{err.message}</p>}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    defaultValue={this.state.password}
                    onChange={this.handleChange}
                  />
                  {err.kind === "password" && <p>{err.message}</p>}
                  <button>Sign Up</button>
                </form>
                <div className="sign-forgot">
                  <div className="sign-up w-100">
                    <p className="text-left">
                      Already Registered? <Link to="/signin">Sign In</Link>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth,
  isAuthenticated: store.auth.isAuthenticated,
  err: store.err
});

export default connect(mapStateToProps, {
  registeruser,
  login,
  logout1,
  googleSignin,
  facebookSignin
})(withRouter(Signup));
