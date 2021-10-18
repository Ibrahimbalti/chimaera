import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { login, googleSignin, facebookSignin } from "../../actions/authAction";
import { GoogleLogin } from "react-google-login-component";
import FacebookLogin from "react-facebook-login";
import appConfig from "../../config/config";
import { Icon } from "antd";

class Login extends React.Component {
  state = {
    usernameOrEmail: "",
    password: "",
    err: {}
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.err) {
      this.setState({ err: nextProps.err });
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const user = {};
    user.email = this.state.usernameOrEmail;
    user.userName = this.state.usernameOrEmail;
    user.password = this.state.password;
    this.props.login(user, this.props.history);
  };
  responseFacebook = async response => {
    const flag = await this.props.facebookSignin(response);
    if (flag) {
      this.props.history.push("/user-admin");
    }
  };
  responseGoogleSuccess = async response => {
    try {
      const flag = await this.props.googleSignin(
        response.getAuthResponse().id_token,
        this.state.uuid
      );
      if (flag) {
        this.props.history.push("/user-admin");
      }
    } catch (e) {
    }
  };

  responseGoogleFailure = error => {};

  render() {
    const { err } = this.state.err;
    return (
      <section id="login" className="login-1">
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
                <h4 className="text-center">Welcome back!</h4>
                <form onSubmit={this.handleSubmit}>
                  {err && <p>{err}</p>}
                  <input
                    type="text"
                    placeholder="Username or email"
                    name="usernameOrEmail"
                    defaultValue={this.state.usernameOrEmail}
                    onChange={this.handleChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    defaultValue={this.state.password}
                    onChange={this.handleChange}
                  />
                  <button>Sign In</button>
                </form>
                <div className="devider-login">
                  <p>or</p>
                </div>
                <div className="social-login">
                  <GoogleLogin
                    socialId={appConfig.googleClientId}
                    className="google-login google-btn"
                    scope="profile email"
                    fetchBasicProfile={true}
                    responseHandler={this.responseGoogleSuccess}
                  >
                    <Icon type="google" size="22" />
                    <span className="ml-1">Sign In With Google</span>
                  </GoogleLogin>
                  <FacebookLogin
                    className="fb-btn"
                    appId={appConfig.facebookClientId}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    icon="fa-facebook"
                    cssClass="facebook-button"
                    textButton="Sign In with Facebook"
                  />
                </div>
                <div className="sign-forgot">
                  <div className="sign-up">
                    <p>
                      Not Registered? <Link to="/signup">Sign Up</Link>{" "}
                    </p>
                  </div>
                  <div className="forgot-pass">
                    <p>
                      <Link to="/forget-password">Forgot password?</Link>
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

const mapPropsToState = stroe => ({
  isAuthenticated: stroe.auth.isAuthenticated,
  err: stroe.err
});
export default connect(mapPropsToState, {
  login,
  googleSignin,
  facebookSignin
})(withRouter(Login));
