import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Card } from "antd";
import MenuCom from "./common/Menu";
import AuthFooter from "./common/AuthFooter";
import { setBlog } from "../actions/authAction";
import moment from "moment";

class Blog extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.setBlog();
  }
  render() {
    return (
      <section id="settings">
        <MenuCom />
        <Container style={{ minHeight: "100vh" }}>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <div className="up">
                <div className="header">
                  <h2>All News</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {this.props.blogs.length === 0 && <p>No news has been published yet.</p>}
                  {this.props.blogs.map((item, index) => (
                    <div key={index} className="colps-mine">
                      <Card style={{ width: "100%" }}>
                        <div className="d-flex justify-content-between">
                          <h4>{item.title}</h4>
                          <p>
                            Created at:{" "}
                            {moment(item.createAt).format("dddd, MMMM Do YYYY")}
                          </p>
                        </div>
                        {item.icon && (
                          <img
                            className="float-right img-fluid ml-4 mb-4"
                            src={item.icon }
                            alt="sponsor"
                          />
                        )}
                        <p style={{textAlign: 'justify'}}>{item.desc}</p>
                      </Card>
                    </div>
                  ))}
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
  blogs: stroe.auth.blogs
});

export default connect(mapPropsToState, { setBlog })(Blog);
