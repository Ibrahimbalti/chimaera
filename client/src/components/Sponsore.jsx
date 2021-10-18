import React from "react";
import { connect } from "react-redux";
import { reload } from "../actions/authAction";

class SingleItem extends React.Component {
  render() {
    return (
      <a
        href={this.props.sponsore.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={this.handleTotalView}
      >
        <div className="collapsible-header">
          <div className="header-desc sponsore-tag">
            {!this.props.textCentered && (
              <div className="social-logo">
                <img src={this.props.sponsore.icon} alt="social" />
              </div>
            )}
            <div
              className={
                !this.props.textCentered
                  ? "social-head "
                  : "social-head text-center"
              }
              style={{ width: "100%" }}
            >
              <h4
                className={!this.props.textCentered ? "site" : "site p-0"}
                style={{ width: "100%" }}
              >
                {this.props.sponsore.sponsorName}
              </h4>
              <p className={this.props.textCentered ? "p-0" : ""}>
                {this.props.sponsore.desc}
              </p>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

export default connect(null, { reload })(SingleItem);
