import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { setIcons } from "../actions/authAction";
import IconModal from "./common/IconModal";
import MenuCom from "./common/Menu";
import Axios from "axios";
import { toast } from "react-toastify";

class AddLink extends React.Component {
  state = {
    key: "contacts",
    icons: [],
    sigleIcon: {},
    show: false,
    cardEmail: "",
    cardEmail1: "",
    phone: "",
    phone1: "",
    address: "",
    address1: "",
    err: { type: "", message: "" }
  };
  componentDidMount() {
    this.props.setIcons("addlink");
    const socialIcon = JSON.parse(localStorage.getItem("socialIcons"));
    if (socialIcon) this.setState({ icons: socialIcon.socialIcon });
    else this.setState({ icons: [] });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ icons: nextProps.icons.socialIcon });
  }
  handleModalClose = () => this.setState({ show: false });
  handleModalOpen = item => this.setState({ sigleIcon: item, show: true });
  handleTabs = key => {
    if (key === "social")
      this.setState({ key, icons: this.props.icons.socialIcon || [] });
    else if (key === "video")
      this.setState({ key, icons: this.props.icons.videoIcon || [] });
    else if (key === "audio")
      this.setState({ key, icons: this.props.icons.audioIcon || [] });
      else if (key === "custom")
      this.setState({ key, icons: this.props.icons.custom || [] });
      else if (key === "eCoomerse")
      this.setState({ key, icons: this.props.icons.eCoomerse || [] });
      else if (key === "Communication")
      this.setState({ key, icons: this.props.icons.Communication || [] });
      else if (key === "Payments")
      this.setState({ key, icons: this.props.icons.Payments || [] });
    else this.setState({ key });
  };
  onSubmit = e => {
    e.preventDefault();
    const obj = {};
    if (this.state.cardEmail) obj.cardEmail = this.state.cardEmail;
    if (this.state.cardEmail1) obj.cardEmail1 = this.state.cardEmail1;
    if (this.state.phone) obj.phone = this.state.phone;
    if (this.state.phone1) obj.phone1 = this.state.phone1;
    if (this.state.address) obj.address = this.state.address;
    if (this.state.address1) obj.address1 = this.state.address1;
    Axios.post("users/add-contacts", obj)
      .then(res => {
        toast.success("Saved.");
      })
      .catch(err => {
        this.setState({
          err: { type: "contacts", message: "Something went wrong" }
        });
      });
  };
  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <section id="add-link">
        <MenuCom />
        <IconModal
          show={this.state.show}
          handleClose={this.handleModalClose}
          icon={this.state.sigleIcon}
          history={this.props.history}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tab-outer">
                <div className="add-link-title">
                  <h2>Add links to your Chimaera Profile</h2>
                </div>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={key => this.handleTabs(key)}
                >
                  <Tab eventKey="social" title="Social">
                    <div className="tab-inner">
                      {this.state.icons.length === 0 && <p>No items</p>}
                      {this.state.icons.map((item, key) => {
                        if (
                          item.visibility === "premium" &&
                          this.props.account_type !== "plus"
                        )
                          return "";
                        else
                          return (
                            <div
                              className="img-box text-center"
                              key={key}
                              onClick={() => this.handleModalOpen(item)}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="img-fluid"
                              />
                              <h3>{item.title}</h3>
                            </div>
                          );
                      })}
                    </div>
                  </Tab>
                  <Tab eventKey="video" title="Video">
                    <div className="tab-inner">
                      {this.state.icons.length === 0 && <p>No items</p>}
                      {this.state.icons.map((item, key) => {
                        if (
                          item.visibility === "premium" &&
                          this.props.account_type !== "plus"
                        )
                          return "";
                        else
                          return (
                            <div
                              className="img-box text-center"
                              key={key}
                              onClick={() => this.handleModalOpen(item)}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="img-fluid"
                              />
                              <h3>{item.title}</h3>
                            </div>
                          );
                      })}
                    </div>
                  </Tab>
                  <Tab eventKey="audio" title="MP3">
                    <div className="tab-inner">
                      {this.state.icons.length === 0 && <p>No items</p>}
                      {this.state.icons.map((item, key) => {
                        if (
                          item.visibility === "premium" &&
                          this.props.account_type !== "gold"
                        )
                          return "";
                        else
                          return (
                            <div
                              className="img-box text-center"
                              key={key}
                              onClick={() => this.handleModalOpen(item)}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="img-fluid"
                              />
                              <h3>{item.title}</h3>
                            </div>
                          );
                      })}
                    </div>
                  </Tab>
                  <Tab eventKey="Communication" title="Communication">
                    <div className="tab-inner">
                      {this.state.icons.length === 0 && <p>No items</p>}
                      {this.state.icons.map((item, key) => {
                        if (
                          item.visibility === "premium" &&
                          this.props.account_type !== "gold"
                        )
                          return "";
                        else
                          return (
                            <div
                              className="img-box text-center"
                              key={key}
                              onClick={() => this.handleModalOpen(item)}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="img-fluid"
                              />
                              <h3>{item.title}</h3>
                            </div>
                          );
                      })}
                    </div>
                  </Tab>
                  <Tab eventKey="eCoomerse" title="eCommerce">
                    <div className="tab-inner">
                      {this.state.icons.length === 0 && <p>No items</p>}
                      {this.state.icons.map((item, key) => {
                        if (
                          item.visibility === "premium" &&
                          this.props.account_type !== "gold"
                        )
                          return "";
                        else
                          return (
                            <div
                              className="img-box text-center"
                              key={key}
                              onClick={() => this.handleModalOpen(item)}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="img-fluid"
                              />
                              <h3>{item.title}</h3>
                            </div>
                          );
                      })}
                    </div>
                  </Tab>
                  <Tab eventKey="Payments" title="Payments">
                    <div className="tab-inner">
                      {this.state.icons.length === 0 && <p>No items</p>}
                      {this.state.icons.map((item, key) => {
                        if (
                          item.visibility === "premium" &&
                          this.props.account_type !== "gold"
                        )
                          return "";
                        else
                          return (
                            <div
                              className="img-box text-center"
                              key={key}
                              onClick={() => this.handleModalOpen(item)}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="img-fluid"
                              />
                              <h3>{item.title}</h3>
                            </div>
                          );
                      })}
                    </div>
                  </Tab>
                  <Tab eventKey="custom" title="Custom">
                    <div className="tab-inner">
                      {this.state.icons.length === 0 && <p>No items</p>}
                      {this.state.icons.map((item, key) => {
                        if (
                          item.visibility === "premium" &&
                          this.props.account_type !== "gold"
                        )
                          return "";
                        else
                          return (
                            <div
                              className="img-box text-center"
                              key={key}
                              onClick={() => this.handleModalOpen(item)}
                            >
                              <img
                                src={item.icon}
                                alt=""
                                className="img-fluid"
                              />
                              <h3>{item.title}</h3>
                            </div>
                          );
                      })}
                    </div>
                  </Tab>
                  <Tab eventKey="contacts" title="Contact Info">
                    <form className="contacts-form mt-5">
                      {this.state.err.type === "contacts" && (
                        <p style={{ color: "red" }}>Something went wrong.</p>
                      )}
                       <div className="display">
                        <div className="form-corol">
                          <input
                            type="email"
                            placeholder="Email"
                            defaultValue={this.props.user.cardEmail1}
                            name="cardEmail1"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="form-corol">
                          <input
                            // value={this.state.phone1}
                            type="text"
                            placeholder="Cell Phone"
                            defaultValue={this.props.user.phone1}
                            name="phone1"
                            onChange={this.handleInputChange}
                          />
                        </div>

                        <div className="form-corol">
                          <input
                            // value={this.state.address1}
                            type="text"
                            placeholder="Address"
                            defaultValue={this.props.user.address1}
                            name="address1"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <section className="text-center">
                          <button className="btn" onClick={this.onSubmit}>
                          Update Add to Contacts Button
                          </button>
                        </section>
                      </div>
                      <div className="additional">
                        <div className="form-corol">
                          <input
                            // value={this.state.cardEmail}
                            type="email"
                            placeholder="Displayed Email"
                            defaultValue={this.props.user.cardEmail}
                            name="cardEmail"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="form-corol">
                          <input
                            // value={this.state.phone}
                            type="text"
                            defaultValue={this.props.user.phone}
                            placeholder="Displayed Phone Number"
                            name="phone"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div>
                          <input
                            // value={this.state.address}
                            type="text"
                            defaultValue={this.props.user.address}
                            placeholder="Displayed Address"
                            name="address"
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <section className="text-center">
                          <button className="btn" onClick={this.onSubmit}>
                            Update Displayed Contact Information
                          </button>
                        </section>
                      </div>
                    </form>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapPropsToState = state => ({
  icons: state.auth.icons,
  account_type: state.auth.user.account_type,
  user: state.auth.user,
  err: state.err
});

export default connect(mapPropsToState, { setIcons })(AddLink);
