import React from "react";
import SlinkCard from "./SlinkCard";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiTrashCanOutline, mdiPencil } from "@mdi/js";
import { connect } from "react-redux";
import Menubar from "./common/Menu";
import { updateUser, reload, setIcons, setBlog } from "../actions/authAction";
import { Switch } from "antd";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import FileSaver  from 'file-saver';
// import download from 'downloadjs'
// import jsFileDownload from 'js-file-download'

class UserAdmin extends React.Component {
  state = {
    count: 0,
    sponsore: undefined,
    emailProvider: true,
    cardEmail: "",
    address: "",
    phone: ""
  };
  handleCardDelete = () => {
    confirmAlert({
      title: "Are you sure?",
      buttons: [
        {
          label: "Cancel",
          onClick: () => { }
        },
        {
          label: "Yes, Delete it!",
          onClick: () => {
            axios
              .post("users/delete-contacts", {
                cardEmail: "",
                phone: "",
                address: ""
              })
              .then(res => {
                this.props.reload(this.props.user._id);
                toast.success("Saved.");
              })
              .catch(err => {
                toast.error("Something went wrong!");
              });
          }
        }
      ]
    });
  };
  handleCard = () => {
    const obj = {
      cardEmail: this.state.cardEmail,
      phone: this.state.phone,
      address: this.state.address
    };
    axios
      .post("users/add-contacts", obj)
      .then(res => {
        this.props.reload(this.props.user._id);
        toast.success("Saved.");
      })
      .catch(err => {
        toast.error("Something went wrong!");
      });
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
  cardCustomEdit = onClose => (
    <form className="links-form" onSubmit={this.handleCard}>
      <div className="link">
        <label htmlFor="title">Email:</label>
        <input
          type="text"
          name="cardEmail"
          defaultValue={this.props.user.cardEmail}
          onChange={this.handleInputChange}
        />
      </div>
      <div className="link">
        <label htmlFor="title">Phone:</label>
        <input
          type="text"
          name="phone"
          defaultValue={this.props.user.phone}
          onChange={this.handleInputChange}
        />
      </div>
      <div className="link">
        <label htmlFor="desc">Address:</label>
        <input
          type="text"
          name="address"
          defaultValue={this.props.user.address}
          onChange={this.handleInputChange}
        />
      </div>
      <div className="fun">
        <button
          onClick={e => {
            this.handleCard();
            onClose();
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
  handleAddressProvider = () => {
    confirmAlert({
      title: "Are you sure?",
      message: this.props.user.emailProvider
        ? "This address will be disabled."
        : "This address will be enable.",
      buttons: [
        {
          label: "Cancel",
          onClick: () => { }
        },
        {
          label: "Yes, Change it!",
          onClick: () => {
            this.setState(prevState => ({
              emailProvider: !prevState.emailProvider
            }));
            axios
              .post("/users/card-email", {
                emailProvider: this.state.emailProvider
              })
              .then(res => {
                toast.success("Saved.");
              })
              .catch(e => { });
          }
        }
      ]
    });
  };
  UNSAFE_componentWillMount() {
    window.scrollTo(0, 0);
    this.props.reload(this.props.user._id);
    this.props.setIcons();
    this.props.setBlog();
    axios
      .get(`/public/getSponsore/${this.props.user.userName}`)
      .then(res => {
        this.setState({ sponsore: res.data });
      })
      .catch(err => { });
  }
  render() {
    let styles = {
      background: this.props.user.profileBc
    };
    return (
      <React.Fragment>
        <section id="admin" style={styles}>
          <Menubar />
          <Link to="/add-link">
            <span className="plus-icon" title="Add link">
              +
            </span>
          </Link>
          <Container>
            <Row>
              <Col md={this.props.user.layout === "horizontal" ? 2 : 3}></Col>
              <Col md={this.props.user.layout === "horizontal" ? 8 : 6} sm={12}>
                <div
                  className={
                    this.props.user.rounded_corner
                      ? `business-card ${
                      this.props.user.layout === "horizontal"
                        ? "horizontal"
                        : ""
                      }`
                      : `business-card rounded-0 ${
                      this.props.user.layout === "horizontal"
                        ? "horizontal"
                        : ""
                      }`
                  }
                >
                  <div
                    className={
                      this.props.user.rounded_corner
                        ? "profile rounded-custom"
                        : "profile rounded-0"
                    }
                  >
                    <div className="view">
                      <Icon path={mdiEyeOutline} size="18px" color="#000000" />
                      <div className="count">{this.props.user.totalView}</div>
                    </div>
                    <div className="profile-inner text-center">
                      <div
                        className="circular--portrait"
                        style={{
                          backgroundImage: `url(${this.props.user.avatar ||
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})`,
                          border: "7px solid #FE0501"
                        }}
                      ></div>

                      <div className="name">
                        <h4>{this.props.user.displayedName}</h4>
                        <p>{this.props.user.designation}</p>
                      </div>
                    </div>
                  </div>
                  <div className="slink-group">
                    <div
                      className="header"
                      style={{
                        position: "relative"
                      }}
                    >
                      <div
                        className="addr-fuct"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          transform: "translateY(100%)",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >
                        {(this.props.user.cardEmail ||
                          this.props.user.phone ||
                          this.props.user.address) && (
                            <>
                              <div
                                style={{
                                  marginRight: "5px"
                                }}
                              >
                                <Switch
                                  onChange={this.handleAddressProvider}
                                  checked={this.state.emailProvider}
                                  type="checked"
                                  height={20}
                                  width={35}
                                />
                              </div>
                              <Icon
                                path={mdiPencil}
                                size="18px"
                                color="#000000"
                                style={{ cursor: "pointer", marginRight: "5px" }}
                                onClick={() => {
                                  confirmAlert({
                                    customUI: ({ onClose }) =>
                                      this.cardCustomEdit(onClose)
                                  });
                                }}
                              />
                              <Icon
                                path={mdiTrashCanOutline}
                                size="18px"
                                color="red"
                                onClick={this.handleCardDelete}
                                style={{ cursor: "pointer", marginRight: "5px" }}
                              />
                            </>
                          )}
                      </div>
                      <div className="social-head d-flex align-items-center">
                        <pre className="site">{this.props.user.bio}</pre>
                      </div>
                    </div>
                    <div className="addres-user"
                      style={{ display: (this.props.user.cardEmail || this.props.user.phone || this.props.user.address) ? 'inline-block' : 'block' }}
                    >
                      {this.props.user.cardEmail && (
                        <div className="d-flex mt-1">
                          <img
                            src="/img/mail.png"
                            alt=""
                            style={{ width: "23px", height: "23px" }}
                          />
                          <a href={`mailto:${this.props.user.cardEmail}`}>
                            {this.props.user.cardEmail}
                          </a>
                        </div>
                      )}
                      {this.props.user.phone && (
                        <div className="d-flex mt-1">
                          <img
                            src="/img/phone.png"
                            alt=""
                            style={{ width: "25px", height: "25px" }}
                          />
                          <a href={`tel:${this.props.user.phone}`}>
                            {this.props.user.phone}
                          </a>
                        </div>
                      )}
                      {this.props.user.address && (
                        <div className="d-flex mt-1">
                          <img
                            src="/img/location.png"
                            alt=""
                            style={{ width: "25px", height: "25px" }}
                          />
                          <p style={{ color: "#8c8ca9" }}>
                            {this.props.user.address}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="add-contact text-center">
                      <button
                        className="d-flex justify-content-between"
                        onClick={async () => {
                          const res = await fetch(`/public/vcf/${this.props.user.userName}`);
                          const blob = await res.blob(["Save on user interaction"], {type:"text/vcard"})
                          // const url = window.URL.createObjectURL(blob);
                          // const a = document.createElement('a');
                          // a.style.display = 'none';
                          // a.href = url;
                          // // the filename you want
                          // a.download = `${this.props.user.displayedName}.vcf`;
                          // document.body.appendChild(a);
                          // a.click();
                          // window.URL.revokeObjectURL(url);
                          FileSaver.saveAs(blob, `${this.props.user.displayedName}.vcf`);
                          // console.log(res.blob())
                          // jsFileDownload(res, `${this.props.user.displayedName}.vcf`);
                          // download(blob, `${this.props.user.displayedName}.vcf`, 'text/vcard');                          
                        }}
                      >
                        Add To Contacts
                        <img src="/img/down.png" alt="" />
                      </button>
                    </div>
                    <SlinkCard
                      isPublic={false}
                      socialSharing={this.props.user.socialSharing}
                      slinkLinks={this.props.user.slinkLinks}
                      user_id={this.props.user._id}
                      sponsore={this.state.sponsore}
                      email={this.props.user.email}
                      textCentered={this.props.user.hide_icons}
                      hideSponsore={this.props.user.hide_sponsore}
                      account_type={this.props.user.account_type}
                      publicURL={this.props.user.publicURL}
                      hide_chimaera={this.props.user.hide_chimaera}
                      full_colored_button={this.props.user.full_colored_button}
                    />
                  </div>
                </div>
              </Col>
              <Col md={this.props.user.layout === "horizontal" ? 2 : 3}></Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

const mapPropsToState = stroe => ({
  user: stroe.auth.user,
  err: stroe.err
});

export default connect(mapPropsToState, {
  updateUser,
  reload,
  setIcons,
  setBlog
})(UserAdmin);
