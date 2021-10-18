import React from "react";
import { Link } from "react-router-dom";

class AuthFooter extends React.Component {
  render() {
    return (
      <div id="authFooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* <h3>We believe this page will helpful for you.</h3> */}
              <Link to="/user-admin" className="btn-generic btn-red">
                Back to dashboard
              </Link>
              <p style={{color: '#ffff', maxWidth: '500px', margin: '30px auto'}}>Chimaera Co. is not endorsed by or in partnership with Facebook, Instagram, or any Facebook Company, and is not endorsed by or in affiliation with any Social Network.</p>
              <p style={{color: '#ffff'}}>© Chimaera Co. 2020. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthFooter;
