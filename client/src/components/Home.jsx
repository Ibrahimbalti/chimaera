import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./common/Header";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { connect } from "react-redux";

class Home extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/user-admin");
    }
    return (
      <React.Fragment>
        <Header />
        <div id="home">
          <section className="hero">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="hero-content">
                    <div className="hero-content-inner">
                      <h2>Showcase your Online Identity</h2>
                      <h2>
                        <span className="header-title">with Chimaera</span>
                      </h2>
                      <p>
                        Display all your social media, websites, and contact
                        information in one place.
                      </p>
                      <Link
                        to="/signup"
                        className="btn btn-lg btn-generic btn-red"
                      >
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="working-process" className="pb-0">
            <div className="div-title text-center mb-50">
              <h2>
                <span className="div-title-span">NETWORKING MADE SIMPLE</span>
              </h2>
              <p
                style={{
                  margin: "auto",
                  textAlign: "center",
                  marginTop: "35px"
                }}
              >
                Easily place your information on Chimaera.
              </p>
              <p
                style={{
                  marginBottom: "0px",
                  textAlign: "center",
                  margin: "auto"
                }}
              >
                From phone numbers and business emails to physical addresses and
                social media profiles.
              </p>
              <p
                style={{
                  marginBottom: "0px",
                  textAlign: "center",
                  margin: "auto"
                }}
              >
               Edit anytime.
              </p>
              <p
                style={{
                  marginBottom: "0px",
                  textAlign: "center",
                  margin: "auto"
                }}
              >
                Share everything instantly.
              </p>
              <p style={{ textAlign: "center", margin: "auto" }}>
                Because it’s not what you know, but who you know.
              </p>
            </div>
            <div className="container">
              <div className="row">
                <img
                  src="/img/circle-share.jpeg"
                  alt="circle-share"
                  style={{
                    display: "block",
                    maxWidth: "100%",
                    margin: "auto"
                  }}
                />
              </div>
            </div>
          </section>
          <section id="working-process">
            <div className="div-title text-center">
              <h2>
                <span className="div-title-span">How it Works</span>
              </h2>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <img src="/img/home1.jpg" alt="img" className="img-fluid" />
                </div>
                <div className="col-md-4">
                  <img src="/img/home2.jpg" alt="img" className="img-fluid" />
                </div>
                <div className="col-md-4">
                  <img src="/img/home3.jpg" alt="img" className="img-fluid" />
                </div>
              </div>
            </div>
          </section>
        </div>
        <section id="social">
          <Container>
            <Row>
              <Col sm={12}>
                <div className="section-header">
                  <h3>Share Everything From One Place.</h3>
                </div>
              </Col>
              <Col sm={12}>
                <div className="hero-signup text-center">
                  <Link to="/signup" className="btn btn-lg btn-generic btn-red">
                    Sign Up for FREE
                  </Link>
                </div>
              </Col>
              <Col sm={12}>
                <div className="social-icon text-center">
                  <a
                    href="www.chimaera.co/share/ChimaeraCo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/logo.png"
                      alt="snapchat"
                      style={{ width: "90px" }}
                    />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth
});
export default connect(mapStateToProps, {})(Home);
// export default Home
