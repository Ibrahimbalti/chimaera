import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MenuCom from "./common/Menu";
import AuthFooter from "./common/AuthFooter";
import { connect } from "react-redux";

class Help extends React.Component {
  componentDidMount(){
    window.openSidevar()
  }
  render() {
    return (
      <section id="settings">
        <MenuCom />
        <Container>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <div className="up">
                <div className="header">
                  <h2>Help</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <p className="text-center">
                    For Help & Support, you can message us{" "}
                    <a
                      href="#/"
                      id="chimaera "
                      className="drift-open-chat"
                      rel="noopener noreferrer"
                      style={{ color: "#1890ff" }}
                      onClick={this.handleClick}
                    >
                      here
                    </a>
                    .
                  </p>
                  {/* <p className="text-center">
                    You may also visit our Chimaera Profile to view all our
                    Contact Information{" "}
                    <a
                      href={this.props.user.publicURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                    </a>
                    .
                  </p> */}
                  <p className="text-center mt-5 mb-5">
                    Alternatively, you may message us with Feedback, Questions
                    and Concerns via Email at:
                    <a
                      style={{ display: "block" }}
                      href="mailto:support@chimaera.co"
                    >
                      support@chimaera.co
                    </a>
                    <span
                      style={{ display: "inline-block" }}
                      className="mt-5 font-weight-bold"
                    >
                      Please include Main Points within the Subject Line.
                    </span>
                  </p>
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

const mapPropsToState = stroe => ({
  user: stroe.auth.user
});

export default connect(mapPropsToState, {})(Help);
