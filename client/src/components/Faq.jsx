import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Collapse } from "antd";
import MenuCom from "./common/Menu";
import AuthFooter from "./common/AuthFooter";

class Faq extends React.Component {
  render() {
    const { Panel } = Collapse;
    return (
      <section id="settings">
        <MenuCom />
        <Container>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <div className="up">
                <div className="header">
                  <h2>Frequently Asked Questions</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="colps-mine">
                    <Collapse accordion>
                      <Panel
                        header="How do I edit/modify my Chimaera Profile and add contact information, social media, websites and more?"
                        key="1"
                      >
                        <p>
                          You may edit your Chimaera Card Profile and Settings
                          by logging in here at link.
                        </p>
                      </Panel>
                      <Panel
                        header="Can I change the email address currently linked to my account?"
                        key="2"
                      >
                        <p>
                          Yes you are able to change the email address
                          associated with your Chimaera Account by first logging
                          in to your Chimaera Profile. Then, under your Account
                          Settings, find your ‘Registered Email’. Finally, click
                          on ‘Change My Email Address’ to modify your connected
                          email.
                        </p>
                      </Panel>
                      <Panel
                        header="How do I purchase a premium plan to access your Premium Features?"
                        key="3"
                      >
                        <p>
                          When logged in to your Chimaera Account, visit your
                          Account Settings. Scroll down to Chimaera Gold
                          (premium) to view Premium Features options. Click on
                          ‘Find Packages’ to view our Premium plans.
                        </p>
                      </Panel>
                      <Panel
                        header="Does my Chimaera Gold membership come with all future updates and features?"
                        key="4"
                      >
                        <p>
                          Yes! All Chimaera Gold users will receive all our
                          latest features and updates, as they roll out. We
                          strive to have an easygoing customer experience and
                          will constantly update our system and add new
                          features/ options.
                        </p>
                      </Panel>
                      <Panel header="What is the ‘Skipper’ Feature?" key="5">
                        <p>
                          Our Skipper option allows users to select one link to
                          bypass all other connected information, for a period.
                          To enable Skipper, please scroll down to the ‘Skipper’
                          feature under your Account Settings. Then, choose the
                          Link you’d like to be bypassed and set a time range.
                          During your allotted time, all traffic to your
                          Chimaera Card/ Profile will be funneled to that link.
                        </p>
                      </Panel>
                      <Panel
                        header="How do I cancel my premium membership?"
                        key="6"
                      >
                        <p>
                          To cancel your premium benefits, please send us an
                          email with your Chimaera ID in the Subject Line to
                          support@chimaera.co And ask to cancel your Premium
                          Benefits. To find your Chimaera ID, simply visit your
                          profile under ‘Account Settings’.
                        </p>
                      </Panel>
                    </Collapse>
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
