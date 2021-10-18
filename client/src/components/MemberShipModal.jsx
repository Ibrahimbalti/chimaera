import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { updateUser } from "../actions/authAction";
// import validUrl from "valid-url";

class IconModal extends React.Component {
  
  handleClose = () => {
    this.setState({ err: {}, saving: false });
    this.props.handleModalClose();
  };
  render() {
    const { icon } = this.props;
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Link Will be Added to Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {icon.icon && (
            <div id="modal-body">
              <div className="img-box">
                <img
                  src={
                    "data:image/png;base64," +
                    btoa(
                      String.fromCharCode.apply(
                        null,
                        new Uint8Array(icon.icon.data)
                      )
                    )
                  }
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="form-box">
                <form>
                  <div className="input-group">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      defaultValue={icon.title}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-group">
                    {this.state.err && <p>{this.state.err.message}</p>}
                    <input
                      type="text"
                      name="link"
                      placeholder="Link"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      name="desc"
                      placeholder="Description"
                      onChange={this.handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button className="btn modal-save" onClick={this.handleSubmit}>
            {this.state.saving ? "Saving..." : "add link"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(null, { updateUser })(IconModal);
