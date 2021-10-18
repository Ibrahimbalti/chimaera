import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

class ForgetPass extends React.Component {
  state = {
    email: "",
    err: "",
    sending: false
  };
  handleInputchange = e => {
    this.setState({ email: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ sending: true });
    axios
      .post("users/recover-password", { email: this.state.email })
      .then(res => {
        this.setState({
          err: "Plsease check your email for further instruction.",
          sending: false
        });
      })
      .catch(err => {
        this.setState({
          err: "Unable to send email. Please try again.",
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
                <h4 className="text-center">Password Recovery</h4>
                <form onSubmit={this.handleSubmit}>
                  {this.state.err && <p>{this.state.err}</p>}
                  <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    required
                    defaultValue={this.state.email}
                    onChange={this.handleInputchange}
                  />
                  <button>
                    {this.state.sending ? "Email Sending.." : "Reset"}
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
