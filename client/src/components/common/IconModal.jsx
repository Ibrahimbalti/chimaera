import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { updateUser } from "../../actions/authAction";

class IconModal extends React.Component {
  state = {
    title: "",
    link: "",
    desc: "",
    saving: false,
    err: {}
  };
  handleChange = e => {
    let { name, value } = e.target;
    if (name === "link") {
      value = value.replace(/\s/g, "");
    }
    this.setState({ [name]: value });
  };
  handleSubmit = async () => {
    const obj = {};
    obj.link = this.props.icon.link;
    obj.link1 = this.state.link;
    this.setState({ saving: true });
    this.state.title
      ? (obj.title = this.state.title)
      : (obj.title = this.props.icon.title);
    this.state.desc ? (obj.desc = this.state.desc) : (obj.desc = "");
    obj.avatar = this.props.icon.icon;
    obj.placeholder = this.props.icon.placeholder;

    await this.props.updateUser({ slinkLinks: { ...obj } });
    this.setState({ saving: false });

    this.handleClose();
  };
  handleClose = () => {
    this.setState({ title: "", link: "", desc: "", saving: false, err: {} });
    this.props.handleClose();
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
                <img src={icon.icon} alt="" className="img-fluid" />
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
                    {icon.tip && (
                      <p style={{ color: "red", fontSize: "10px" }}>
                        *{icon.tip}
                      </p>
                    )}
                    <input
                      type="text"
                      name="link"
                      placeholder={icon.placeholder || ""}
                      // defaultValue={}
                      value={
                        this.state.link && this.state.link.replace(/\s/g, "")
                      }
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
