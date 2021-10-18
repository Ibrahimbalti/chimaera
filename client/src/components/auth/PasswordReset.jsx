import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

class ForgetPass extends React.Component {
  state = {
    password: "",
    confirmPassword: "",
    sending: false,
    err: ""
  };
  handleInputchange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (
        this.state.password &&
        this.state.confirmPassword &&
        this.state.confirmPassword !== this.state.password
      ) {
        this.setState({ err: "Password not match!" });
      } else {
        this.setState({ err: "" });
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ sending: true });
    axios
      .post("/users/password-reset/" + this.props.match.params.id, {
        password: this.state.password
      })
      .then(res => {
        this.setState({ err: "Password change successfully.", sending: false });
        setTimeout(() => {
          this.props.history.push("/signin");
        }, 1000);
      })
      .catch(err => {
        this.setState({
          err: "Unable to change password. Please try again.",
          sending: false
        });
      });
  };
  render() {
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
                <h4 className="text-center">Reset Password</h4>
                <form onSubmit={this.handleSubmit}>
                  {this.state.err && <p>{this.state.err}</p>}
                  <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                    defaultValue={this.state.password}
                    onChange={this.handleInputchange}
                  />
                  <input
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required
                    defaultValue={this.state.confirmPassword}
                    onChange={this.handleInputchange}
                  />
                  <button>
                    {this.state.sending ? "Pasword Changing..." : "Reset"}
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default ForgetPass;
