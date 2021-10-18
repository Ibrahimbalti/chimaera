import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class UserGuide extends Component {
  state = {
    count: 0,
    flag: true
  };
  componentDidMount() {
    window.carousel();
  }
  render() {
    const style = {
      marginBottom: "2px"
    };
    window.carousel();
    if (!this.state.flag) {
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
                    window.carousel();
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
    return (
      <Fragment>
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

                    <div class="owl-carousel owl-theme">
                      <div className="step-img">
                        <div className="header">
                          <h2>
                            Update your account info within the Settings tab
                          </h2>
                        </div>
                        <div className="details">
                          <ul>
                            <li>Go to the setting tab</li>
                          </ul>
                          <img
                            src="/img/setting-tab.png"
                            alt="dfgasd"
                            style={{ maxWidth: "80%", margin: "20px auto" }}
                          />
                          <ul style={{ listStyle: "disc" }}>
                            <li className="mb-3">Create your display name</li>
                            <li className="mb-3">Upload a profile image</li>
                            <li>Save</li>
                            <img
                              src="/img/t1.png"
                              alt="dfgasd"
                              style={{ maxWidth: "100%", margin: "20px auto" }}
                            />
                          </ul>
                        </div>
                      </div>
                      <div className="step-img">
                        <div className="header">
                          <h2>Adding Links</h2>
                        </div>
                        <div className="details">
                          <ul>
                            <li className="mb-3">
                              Click the Add Links option to add your links and
                              update your Contact Information
                            </li>
                          </ul>
                          <img
                            src="/img/add-links.png"
                            alt="dfgasd"
                            style={{ maxWidth: "80%", margin: "20px auto" }}
                          />
                          <ul>
                            <li className="mb-3">
                              Alternatively, you may Add Links by clicking the
                              (+) option here
                            </li>
                          </ul>
                          <img
                            src="/img/t4.png"
                            alt="dfgasd"
                            style={{ maxWidth: "100%", margin: "20px auto" }}
                          />
                        </div>
                      </div>
                      <div className="step-img">
                        <div className="header">
                          <h2>Let’s add your first link!</h2>
                        </div>
                        <div className="details">
                          <div className="para">
                            <ul>
                              <li>Choose an icon</li>
                            </ul>
                            <img
                              src="/img/t6.png"
                              alt="dfgasd"
                              style={{ maxWidth: "100%", margin: "20px auto" }}
                            />
                            <ul>
                              <li>Add a title and description</li>
                              <li>Add your link’s description</li>
                              <li>
                                Follow the prompts to add the appropriate
                                Username or URL
                              </li>
                            </ul>
                            <img
                              src="/img/t8.png"
                              alt="dfgasd"
                              style={{ maxWidth: "100%", margin: "20px auto" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="step-img">
                        <div className="header">
                          <h2>
                            This is where you may trash, edit and view your
                            links
                          </h2>
                        </div>
                        <div className="details">
                          <ul>
                            <li>Go to the profile tab</li>
                          </ul>
                          <div className="para">
                            <img
                              src="/img/t10.png"
                              alt="dfgasd"
                              style={{ maxWidth: "80%", margin: "20px auto" }}
                            />
                          </div>
                          <ul>
                              <li>Here is the edit, delete, enable/disable options for every links</li>
                            </ul>
                          <div className="para">
                            <img
                              src="/img/t3.png"
                              alt="dfgasd"
                              style={{ maxWidth: "100%", margin: "20px auto" }}
                            />
                            <ul>
                              <li>
                                You may also see your total profile views and
                                link clicks
                              </li>
                              <li>All updated in real-time</li>
                            </ul>
                            <img
                              src="/img/t5.png"
                              alt="dfgasd"
                              style={{ maxWidth: "100%", margin: "20px auto" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="step-img">
                        <div className="header">
                          <h2>You’re ready to go!</h2>
                        </div>
                        <div className="details">
                          <p style={{ fontSize: "20px" }}>
                            Click here to view what your profile visitors see
                          </p>
                          <img
                            src="/img/t2.png"
                            alt="dfgasd"
                            style={{ maxWidth: "100%", margin: "20px auto" }}
                          />
                          <div className="sign-group text-center">
                            <div>
                              <Link
                                className="btn btn-sm mt-5 mb-2"
                                style={{
                                  backgroundColor: "#FF0400",
                                  color: "#fff",
                                  padding: "5px 20px",
                                  fontSize: "20px",
                                  textTransform: "capitalize"
                                }}
                                to="/user-admin"
                              >
                                Let's enter
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="sign-group text-center">
                <div>
                  <Link
                    className="btn btn-sm mt-5 mb-2"
                    style={{
                      backgroundColor: "#FF0400",
                      color: "#fff"
                    }}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
                <Link to="/signin" className="btn btn-sm mt-2 mb-5">
                  Sign In
                </Link>
              </div> */}
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default UserGuide;
