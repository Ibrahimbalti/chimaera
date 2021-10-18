import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Switch from "react-switch";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCom from "./common/Menu";
import InputColor from "react-input-color";
import { Select, DatePicker } from "antd";
import {
  updateUser,
  accoutDelete,
  setAutopilot,
  reload
} from "../actions/authAction";
import Axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      privider: false,
      changEmail: false,
      isActive: true,
      startDate: "",
      endDate: "",
      link: "",
      file: "",
      userName: "",
      avatar: "",
      socialSharing: true,
      slinkLinks: [],
      displayedName: "",
      password: "",
      oldPassword: "",
      profileBc: "#fff",
      totalView: 0,
      color: {},
      bio: "",
      designation: "",
      err: {},
      saving: false,
      autopilotSaving: false,
      email: "",
      account_type: "",
      hide_sponsore: false,
      rounded_corner: false,
      full_colored_button: false,
      hide_icons: false,
      premium_saving: false,
      layout: "",
      hide_chimaera: false,
      second_email: "",
      publicURL: "",
      constURL: ""
    };
  }
  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0);
    const {
      hide_chimaera,
      email,
      account_type,
      displayedName,
      socialSharing,
      totalView,
      profileBc,
      bio,
      designation,
      userName,
      avatar,
      slinkLinks,
      autopilot,
      hide_sponsore,
      rounded_corner,
      full_colored_button,
      hide_icons,
      premium_saving,
      layout,
      publicURL
    } = this.props.user;
    const { startDate, endDate, link, isActive } = autopilot;
    this.setState({
      hide_chimaera,
      hide_sponsore,
      rounded_corner,
      full_colored_button,
      hide_icons,
      premium_saving,
      email,
      account_type,
      startDate,
      endDate,
      link,
      isActive,
      displayedName,
      socialSharing,
      totalView,
      profileBc,
      bio,
      designation,
      userName,
      saving: false,
      avatar,
      av: true,
      slinkLinks,
      autopilot,
      primerr: "",
      layout,
      publicURL: userName,
      constURL: publicURL.split("share/")[0]
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      err: nextProps.err,
      saving: false,
      autopilotSaving: false,
      account_type: nextProps.user.account_type
    });
  }
  handleMembership = () => {
    confirmAlert({
      title: "Are you sure?",
      message: <p>All premium feature will be disabled.</p>,
      buttons: [
        {
          label: "Cancel",
          onClick: () => {}
        },
        {
          label: "Yes, Change it!",
          onClick: () => {
            Axios.post("users/account")
              .then(res => {
                toast.success("Account type has been changed succesfully.");
                this.props.reload(this.props.user._id);
                // this.props.history.push("/user-admin");
              })
              .catch(err => {
                toast.warn("Something went wrong!");
              });
          }
        }
      ]
    });
  };
  handleLayout = value => {
    this.setState({ layout: value });
  };
  disabledDate = current => {
    return current && current < moment().endOf("day") - 24 * 60 * 60 * 1000;
  };
  handlePremiumFeature = e => {
    this.setState({ premium_saving: true, primerr: "" });
    e.preventDefault();
    const obj = {
      hide_sponsore: this.state.hide_sponsore,
      hide_icons: this.state.hide_icons,
      full_colored_button: this.state.full_colored_button,
      rounded_corner: this.state.rounded_corner,
      layout: this.state.layout,
      hide_chimaera: this.state.hide_chimaera,
      userName: this.state.publicURL
    };
    Axios.post("users/update-primium", obj)
      .then(res => {
        const { data } = res;
        if (data.err) {
          this.setState({
            err: { type: "url", message: "This url used by another user!" },
            premium_saving: false
          });
        } else {
          toast.success("Saved.");
          this.props.reload(this.props.user._id);
          this.setState({ premium_saving: false });
          // this.props.history.push("/user-admin");
        }
      })
      .catch(err => {
        this.setState({ premium_saving: false, primerr: "Please try again!" });
      });
  };
  handleEmailChange = e => {
    this.setState({ changEmail: true });
    e.preventDefault();
    if (!this.state.second_email) {
      this.setState({
        changEmail: false,
        err: { type: "second_email", message: "Email cann't be empty." }
      });
      return;
    }
    Axios.post("users/recover-email", {
      email: this.state.email,
      second_email: this.state.second_email
    })
      .then(res => {
        if (res && res.data && res.data.secondEmail === false) {
          this.setState({
            changEmail: false,
            err: { type: "second_email", message: res.data.msg }
          });
          return;
        }
        toast.success("Please check your email.");
        this.setState({
          changEmail: false,
          err: { type: "second_email", message: "" }
        });
      })
      .catch(err => {
        this.setState({
          changEmail: false,
          err: { type: "second_email", message: "Please try again." }
        });
      });
  };
  handleDelete = e => {
    e.preventDefault();
    confirmAlert({
      title: "Are you sure?",
      message: "Your account will be delete.",
      buttons: [
        {
          label: "Cancel",
          onClick: () => {}
        },
        {
          label: "Yes, Delete it!",
          onClick: () => {
            this.props.accoutDelete(this.props.history);
          }
        }
      ]
    });
  };
  handlePremium = e => {
    e.preventDefault();
  };
  async _handleSubmit(e) {
    if (e.target.name === "privider") {
      this.setState({ privider: true });
    } else {
      this.setState({ saving: true });
    }
    e.preventDefault();
    const updates = new FormData();
    if (this.state.file) {
      updates.append("avatar", this.state.file);
    }
    updates.append("socialSharing", this.state.socialSharing);
    updates.append("displayedName", this.state.displayedName);
    updates.append("bio", this.state.bio);
    if (this.state.password) {
      updates.append("password", this.state.password);
    }
    if (this.state.oldPassword) {
      updates.append("oldPassword", this.state.oldPassword);
    }
    if (this.state.color) {
      updates.append("profileBc", this.state.color.hex);
    }
    updates.append("designation", this.state.designation);
    await this.props.updateUser(updates, this.props.history);
    this.setState({ privider: false, saving: false });
  }
  setColor = color => {
    this.setState({ color });
  };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSocialBar = socialSharing => {
    this.setState({ socialSharing });
  };
  handleAutopilotActive = checked => {
    this.setState({ isActive: checked });
  };
  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      if (
        file.name.endsWith(".jpg") ||
        file.name.endsWith(".png") ||
        file.name.endsWith(".jpeg") ||
        file.name.endsWith(".JPG") ||
        file.name.endsWith(".PNG") ||
        file.name.endsWith(".JPEG")
      ) {
        reader.onloadend = () => {
          this.setState({
            file: file,
            avatar: reader.result,
            err: {}
          });
        };
        reader.readAsDataURL(file);
      } else {
        this.setState({
          err: { type: "box1", message: "Please enter a valid image!" },
          file: ""
        });
      }
    } else {
      this.setState({ file: "" });
    }
  }
  handleSelectChange = link => {
    this.setState({ link });
  };
  handleDateChange = (date, dateString) => {
    const startDate = moment(dateString[0], "YYYY/MM/DD").valueOf();
    const endDate = moment(dateString[1], "YYYY/MM/DD").valueOf();
    this.setState({ startDate, endDate });
  };
  handleAutoPilotSubmit = e => {
    this.setState({ autopilotSaving: true });
    e.preventDefault();
    const obj = {};
    obj.startDate = this.state.startDate;
    obj.endDate = this.state.endDate;
    obj.link = this.state.link;
    obj.isActive = this.state.isActive;
    this.props.setAutopilot(obj, this.props.history);
  };
  hideIcons = value => this.setState({ hide_icons: value });
  hideChimaera = value => this.setState({ hide_chimaera: value });
  fullColoredButton = value => this.setState({ full_colored_button: value });
  roundedCorner = value => this.setState({ rounded_corner: value });
  hideSponsore = value => this.setState({ hide_sponsore: value });
  render() {
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const style = {
      color: "red"
    };
    return (
      <section id="settings" style={{ minHeight: "100vh" }}>
        <MenuCom />
        <Link to="/add-link">
          <span className="plus-icon" title="Add link">
            +
          </span>
        </Link>
        <Container>
          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <div className="up">
                <div className="header">
                  <h2>ACCOUNT SETTINGS</h2>
                </div>
                <form
                  className="color-form"
                  onSubmit={e => this._handleSubmit(e)}
                >
                  {this.state.err && this.state.err.type === "box1" && (
                    <p className="text-danger">{this.state.err.message}</p>
                  )}
                  <div className="profile-img">
                    <div className="img">
                      <div
                        className="circular--portrait"
                        style={{
                          backgroundImage: `url(${this.state.avatar ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})`
                        }}
                      ></div>
                    </div>
                    <div className="profile-update">
                      <div className="profile-name">
                        <h4>{this.state.displayedName}</h4>
                      </div>
                      <div className="upload-img">
                        <input
                          className="fileInput"
                          type="file"
                          name="avatar"
                          onChange={e => this._handleImageChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <Row>
                      <Col sm={12}>
                        <div className="portion">
                          <div className="display">
                            <label htmlFor="name">Display Name</label>
                            <input
                              type="text"
                              name="displayedName"
                              onChange={this.handleInputChange}
                              defaultValue={this.state.displayedName}
                            />
                          </div>
                          <div className="display">
                            <label htmlFor="name">Chimaera ID</label>
                            <input
                              type="text"
                              name="userName"
                              disabled
                              defaultValue={this.state.userName}
                              className="c-not-allowed"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <div className="portion">
                          <div className="display">
                            <label htmlFor="email">Registered Email</label>
                            <input
                              type="text"
                              name="email"
                              disabled
                              value={this.state.email}
                              className="c-not-allowed"
                            />
                          </div>
                          <div className="display">
                            <label htmlFor="name">Account Type</label>
                            <input
                              type="text"
                              name="account_type"
                              disabled
                              value={`Chimaera ${this.state.account_type}`}
                              className="c-not-allowed"
                              style={{ textTransform: "capitalize" }}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <div className="portion">
                          <div className="display">
                            <label htmlFor="name">Title</label>
                            <input
                              type="text"
                              name="designation"
                              onChange={this.handleInputChange}
                              defaultValue={this.state.designation}
                            />
                          </div>
                          <div className="display">
                            <label
                              htmlFor="name"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline"
                              }}
                            >
                              <span>Bio Update </span>
                              <span style={{ fontSize: "80%" }}>
                                Max length 150
                              </span>
                            </label>
                            <textarea
                              maxLength="150"
                              type="text"
                              name="bio"
                              onChange={this.handleInputChange}
                              defaultValue={this.state.bio}
                              rows="4"
                              id="style-3"
                            ></textarea>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <div className="portion">
                          <div className="display">
                            <label htmlFor="name">Background Color</label>
                            <div className="color">
                              <InputColor
                                initialHexColor={this.state.profileBc}
                                onChange={this.setColor}
                                placement="Color"
                              />
                            </div>
                          </div>
                          <div className="display">
                            <label htmlFor="name">
                              Display social sharing bar
                            </label>
                            <Switch
                              onChange={this.handleSocialBar}
                              checked={this.state.socialSharing}
                            />
                          </div>
                        </div>
                        {!this.props.user.social_provider && (
                          <div className="save text-right mb-5">
                            <button
                              type="submit"
                              disabled={this.state.privider}
                              name="privider"
                              onClick={e => this._handleSubmit(e)}
                            >
                              {this.state.privider ? "Saving..." : "Save"}
                            </button>
                          </div>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        {!this.props.user.social_provider && (
                          <div>
                            <div className="pass">
                              <h4>Password Change</h4>
                            </div>
                            <div className="portion">
                              <div className="display mt-0 mb-0">
                                {this.state.err &&
                                  this.state.err.type === "oldPassword" && (
                                    <p className="text-danger mb-0 mt-1">
                                      {this.state.err.message}
                                    </p>
                                  )}
                                {this.state.err &&
                                  this.state.err.type === "newPassword" && (
                                    <p className="text-danger mb-0 mt-1">
                                      {this.state.err.message}
                                    </p>
                                  )}
                              </div>
                            </div>
                            <div className="portion">
                              <div className="display">
                                <label htmlFor="new password">
                                  Old Password
                                </label>
                                <input
                                  type="password"
                                  name="oldPassword"
                                  onChange={this.handleInputChange}
                                  placeholder="*******"
                                />
                              </div>
                              <div className="display">
                                <label htmlFor="confirm password">
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  name="password"
                                  onChange={this.handleInputChange}
                                  placeholder="*******"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="save text-right">
                          <button
                            type="submit"
                            disabled={this.state.saving}
                            onClick={e => this._handleSubmit(e)}
                          >
                            {this.state.saving ? "Saving..." : "Save"}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </form>
                <form className="color-form">
                  <div className="field">
                    <Row>
                      <Col sm={12}>
                        <div className="pass">
                          <h4>Email Change</h4>
                        </div>
                        <div className="portion email-change">
                          <div className="display">
                            {this.state.err &&
                              this.state.err.type === "second_email" && (
                                <p className="text-danger">
                                  {this.state.err.message}
                                </p>
                              )}
                            <label htmlFor="email">Change Email</label>
                            <input
                              type="text"
                              name="second_email"
                              placeholder="example@gmail.com"
                              value={this.state.second_email}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="display text-right">
                            <button
                              className="grn"
                              onClick={this.handleEmailChange}
                            >
                              {this.state.changEmail
                                ? "Confirming..."
                                : "Change email"}
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </form>
                <form className="color-form">
                  <div className="field">
                    <Row>
                      <Col sm={12}>
                        <div className="pass">
                          <h4>URL Change</h4>
                        </div>

                        <div className="portion">
                          <div className="display">
                            {this.state.err &&
                              this.state.err.type === "url" && (
                                <p style={{ color: "red" }}>
                                  {this.state.err.message}
                                </p>
                              )}
                            <label
                              htmlFor="publicURL"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline"
                              }}
                            >
                              <span>Custom URL</span>{" "}
                              <span style={{ fontSize: "80%" }}>
                                Max length 30
                              </span>
                            </label>
                            <input
                              type="text"
                              name="publicURL"
                              value={this.state.publicURL}
                              onChange={this.handleInputChange}
                              placeholder="url"
                              maxLength="30"
                            />
                            <p>share/{this.state.publicURL}</p>
                          </div>
                          <div className="display text-right email-change">
                            <button
                              className="grn"
                              onClick={this.handlePremiumFeature}
                            >
                              {this.state.premium_saving
                                ? "Confirming..."
                                : "Change"}
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </form>
                <form
                  className="color-form third"
                  onSubmit={this.handlePremium}
                  title={
                    this.state.account_type === "gold"
                      ? ""
                      : "You are not a premium user."
                  }
                >
                  <div className="deletion">
                    <h4>Chimaera Plus (premium)</h4>
                  </div>
                  <div className="portion">
                    <div className="display">
                      <p>Premium Settings</p>
                    </div>
                    <div className="display text-right">
                      <Link to="/payment">
                        <button className="grn">Find Packages</button>
                      </Link>
                    </div>
                  </div>
                  <Row>
                    <Col
                      sm={12}
                      title={
                        this.state.account_type === "gold"
                          ? ""
                          : "You are not a premium user."
                      }
                    >
                      <div className="display w-100">
                        <p>
                          These Features Are Exclusive to Chimaera Premium
                          Users. To Upgrade Your Account, Click the ‘Find
                          Packages’ Button.
                        </p>
                        {this.state.primerr && (
                          <p style={{ color: "red" }}>{this.state.primerr}</p>
                        )}
                      </div>
                      <div className="portion">
                        <div className="display">
                          <label htmlFor="name">Hide Sponsored Links</label>
                          <Switch
                            disabled={
                              this.state.account_type === "gold" ||
                              this.state.account_type === "plus"
                                ? false
                                : true
                            }
                            onChange={this.hideSponsore}
                            checked={this.state.hide_sponsore}
                          />
                        </div>
                        <div className="display">
                          <label htmlFor="name">Rounded Corners</label>
                          <Switch
                            disabled={
                              this.state.account_type === "gold" ? false : true
                            }
                            onChange={this.roundedCorner}
                            checked={this.state.rounded_corner}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <div className="portion">
                        <div className="display">
                          <label htmlFor="name">Full-colored buttons</label>
                          <Switch
                            disabled={
                              this.state.account_type === "gold" ? false : true
                            }
                            onChange={this.fullColoredButton}
                            checked={this.state.full_colored_button}
                          />
                        </div>
                        <div className="display">
                          <label htmlFor="name">
                            Hide Link Icons and Centralize Text
                          </label>
                          <Switch
                            disabled={
                              this.state.account_type === "gold" ? false : true
                            }
                            onChange={this.hideIcons}
                            checked={this.state.hide_icons}
                          />
                        </div>
                      </div>
                      <div className="portion">
                        <div className="display">
                          <label htmlFor="name">
                            Change Chimaera Card Layout
                          </label>
                          <Select
                            disabled={
                              this.state.account_type === "gold" ? false : true
                            }
                            style={{ maxWidth: 250 }}
                            placeholder="Change Card Layout"
                            optionFilterProp="children"
                            value={this.state.layout}
                            onChange={this.handleLayout}
                          >
                            <Option value="horizontal">Horizontal</Option>
                            <Option value="vertical">Vertical</Option>
                          </Select>
                        </div>
                        <div className="display">
                          <label htmlFor="name">
                            Discreet Chimaera Branding
                          </label>
                          <Switch
                            disabled={
                              this.state.account_type === "gold" ? false : true
                            }
                            onChange={this.hideChimaera}
                            checked={this.state.hide_chimaera}
                          />
                        </div>
                      </div>
                      <div
                        className="save text-right"
                        title={
                          this.state.account_type === "gold"
                            ? ""
                            : "You are not a premium user."
                        }
                      >
                        <button
                          type="submit"
                          className="premium-btn"
                          disabled={
                            this.state.account_type === "gold" ||
                            this.state.account_type === "plus"
                              ? false
                              : true
                          }
                          onClick={e => {
                            this.handlePremiumFeature(e);
                          }}
                          style={
                            this.state.account_type !== "gold" &&
                            this.state.account_type !== "plus"
                              ? { cursor: "not-allowed" }
                              : {}
                          }
                        >
                          {this.state.premium_saving ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </Col>
                  </Row>
                  <div className="auto-pilot deletion mt-5">
                    <h4>Skipper</h4>
                  </div>
                  <div className="rt">
                    <label htmlFor="date">Select Chimaera Link</label>
                  </div>
                  {this.state.err && this.state.err.type === "autopilot" && (
                    <p className="text-danger mb-0 mt-1">
                      {this.state.err.message}
                    </p>
                  )}
                  <Select
                    defaultValue={this.state.link}
                    className="rt mt-3"
                    onChange={this.handleSelectChange}
                    disabled={this.state.account_type === "gold" ? false : true}
                  >
                    {this.state.slinkLinks.map((item, index) => (
                      <Option value={item.link} key={index}>
                        {item.link}
                      </Option>
                    ))}
                  </Select>
                  <div className="err-box mt-20">
                    {this.state.err && this.state.err.type === "date" && (
                      <p className="text-danger mb-0 mt-1">
                        {this.state.err.message}
                      </p>
                    )}
                  </div>
                  <div className="portion mt-0">
                    <div className="">
                      <label htmlFor="date">Time range</label>
                      <div className="mt-3">
                        <RangePicker
                          defaultValue={
                            this.state.startDate && this.state.endDate
                              ? [
                                  moment(this.state.startDate, "x"),
                                  moment(this.state.endDate, "x")
                                ]
                              : null
                          }
                          disabled={
                            this.state.account_type === "gold" ? false : true
                          }
                          disabledDate={this.disabledDate}
                          format="YYYY/MM/DD"
                          onChange={this.handleDateChange}
                        />
                      </div>
                    </div>
                    <div className="display mt-0">
                      <label className="text-right">
                        {this.state.isActive ? (
                          <p style={style}>Enable</p>
                        ) : (
                          "Disable"
                        )}
                      </label>
                      <div className="mt-3 text-right">
                        <Switch
                          onChange={this.handleAutopilotActive}
                          checked={this.state.isActive}
                          disabled={
                            this.state.account_type === "gold" ? false : true
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="save text-right">
                    <button
                      disabled={
                        this.state.account_type !== "gold" ||
                        this.state.autopilotSaving
                      }
                      onClick={this.handleAutoPilotSubmit}
                    >
                      {this.state.autopilotSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
                <form
                  className="color-form third"
                  onSubmit={e => e.preventDefault()}
                >
                  <div className="deletion">
                    <h4>Cancel My Premium Membership</h4>
                  </div>
                  <div className="portion">
                    <div className="display">
                      <p>Cancel Your Premium Membership at Any Time.</p>
                    </div>
                    <div className="display text-right">
                      <button onClick={this.handleMembership}>
                        Cancel Premium Benefits
                      </button>
                    </div>
                  </div>
                </form>
                <form className="color-form third" onSubmit={this.handleDelete}>
                  <div className="deletion">
                    <h4>Account Deletion</h4>
                  </div>
                  <div className="portion">
                    <div className="display">
                      <p>Account Delete Request</p>
                    </div>
                    <div className="display text-right">
                      <button>Delete</button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Container>
      </section>
    );
  }
}

const mapPropsToState = stroe => ({
  user: stroe.auth.user,
  err: stroe.err
});

export default connect(mapPropsToState, {
  updateUser,
  accoutDelete,
  setAutopilot,
  reload
})(withRouter(Settings));
