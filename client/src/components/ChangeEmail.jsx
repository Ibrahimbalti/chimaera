import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MenuCom from "./common/Menu";
import AuthFooter from "./common/AuthFooter";
import Axios from "axios";

class Faq extends React.Component {
  state = {
    msg: ''
  };
  componentDidMount() {

    
    Axios
      .post("/users/email-reset/" + this.props.match.params.id)
      .then(res => {
        this.setState({ msg: "Email has been changed successfully."});
        setTimeout(() => {
          this.props.history.push("/user-admin");
        }, 1500);
      })
      .catch(err => {
        this.setState({
          msg: "Token has been expired!. Please try again."
        });
      });
  }
  render() {
    return (
      <section id="settings">
        <MenuCom />
        <Container>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <div className="up" style={{ marginBottom: "0px" }}>
                <div className="header">
                  <h2>Email Change Finalize</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="chage-email">
                    <div className="chage-email-inner text-center">
                      <img
                        src="/img/logo.png"
                        alt="snapchat"
                        style={{ width: "150px" }}
                      />
                      {this.state.msg ? (
                        <div>
                          <h4>{this.state.msg}</h4>
                        </div>
                      ) : (
                        <div>
                          <h4>Processing...</h4>
                          <img src="/img/25.gif" alt="preloader" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={1}></Col>
          </Row>
        </Container>
        <AuthFooter />
      </section>
    );
  }
}

export default Faq;
