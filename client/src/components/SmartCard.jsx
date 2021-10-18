import React, { Fragment } from "react";
import { Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const SmartCard = () => {
  return (
    <Fragment>
      <Container>
        <Row>
          <div className="col-md-12">
            <div className="text-center">
              <h1 style={{ fontWeight: "bold", color: "green" }}>
                Coming Soon
              </h1>
              <Link to='/'><button style={{backgroundColor:"black", color:"#fff"}}>Go Home</button></Link>
            </div>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SmartCard;
