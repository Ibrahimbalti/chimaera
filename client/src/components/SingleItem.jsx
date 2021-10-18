import React, { useState } from "react";
import Icon from "@mdi/react";
import Switch from "react-switch";
import { connect } from "react-redux";
import Modal from "react-modal";
import { setIcons } from "../actions/authAction";
import axios from "axios";
import {
  mdiEyeOutline,
  mdiPencil,
  mdiTrashCanOutline,
  mdiLinkVariant
} from "@mdi/js";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { reload } from "../actions/authAction";
import "react-confirm-alert/src/react-confirm-alert.css";
import ColorPicker from "./ColorPicker";
import { Tab, Tabs } from "react-bootstrap";
import ConfirmModal from "./common/ConfirmModal";

class SingleItem extends React.Component {
  state = {
    count: 0,
    checked: null,
    sigleIcon: {},
    title: "",
    desc: "",
    user_id: "",
    bcColor: "",
    link1: "",
    link: "",
    onModal: false,
    key: "social",
    icons: [],
    placeholder: "",
    icon: "",
    isEdit: false,
    loading: false
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      icons:
        nextProps.icons && Array.isArray(nextProps.icons.socialIcon)
          ? nextProps.icons.socialIcon
          : [],
      title: nextProps.linkDesc.title,
      desc: nextProps.linkDesc.desc,
      link1: nextProps.linkDesc.link1 || "",
      link: nextProps.linkDesc.link || "",
      icon: nextProps.linkDesc.avatar,
      placeholder: nextProps.linkDesc.placeholder
    });
  }

  redirectToLink = () => {
    const {link, link1} = this.props.linkDesc
    if(link && link1){
      if(link.includes('http')){
        window.open(`${link}${link1}`,"_blank")
      }else{
        window.open(`//${link}${link1}`, "_blank")
      }
    }else if(!link || link === 'none'){
      if(link1.includes('http')){
        window.open(link1,"_blank")
      }else{
        window.open(`//${link1}`,"_blank")
      }
    }else{
      if(link.includes('http')){
        window.open(link,"_blank")
      }else{
        window.open(`//${link}`,"_blank")
      }
    }
    this.handleTotalView();
  };
  setColor = color => {
    this.setState({ bcColor: color }, () => {
      axios
        .patch("/users/update-links", {
          bcColor: color,
          index: this.props.index
        })
        .then(res => {
          this.props.reload(this.props.user_id);
        })
        .catch(e => {});
    });
  };
  handleChange = checked => {
    confirmAlert({
      title: "Are you sure?",
      message: !checked
        ? "This link will be disabled."
        : "This link will be enable.",
      buttons: [
        {
          label: "Cancel",
          onClick: () => {}
        },
        {
          label: "Yes, Change it!",
          onClick: () => {
            this.setState({ checked });
            const obj = {
              title: this.props.linkDesc.title,
              desc: this.props.linkDesc.desc,
              enable: checked,
              index: this.props.index,
              bcColor: this.props.linkDesc.bcColor
            };
            axios
              .patch("/users/update-links", obj)
              .then(res => {
                this.props.reload(this.props.user_id);
                toast.success("Saved");
              })
              .catch(e => {});
          }
        }
      ]
    });
  };
  handleInputChange = e => {
    let { name, value } = e.target;
    if (name === "link1") {
      value = value.replace(/\s/g, "");
    }
    this.setState({ [name]: value });
  };
  handleFormSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const obj = {
      title: this.state.title,
      icon: this.state.icon,
      desc: this.state.desc,
      link: this.state.link,
      link1: this.state.link1,
      placeholder: this.state.placeholder,
      enable: this.props.linkDesc.enable,
      index: this.props.index
    };
    axios
      .patch("/users/update-links", obj)
      .then(res => {
        this.props.reload(this.props.user_id);
        toast.success("Saved.");
        this.setState({ loading: false, isEdit: false });
      })
      .catch(e => {
        this.setState({ loading: false, isEdit: false });
      });
  };
  handleEdit = () => {
    this.setState(pre => ({ isEdit: !pre.isEdit }));
  };
  handleLinkDelete = () => {
    confirmAlert({
      title: "Are you sure?",
      message: "You are deleting the link.",
      buttons: [
        {
          label: "No",
          onClick: () => {}
        },
        {
          label: "Yes, Delete it!",
          onClick: () => {
            axios
              .delete(`/users/delete-links/${this.props.index}`)
              .then(res => {
                toast.success("Card deleted successfully.");
                this.props.reload(this.props.user_id);
              })
              .catch(e => {});
          }
        }
      ]
    });
  };
  handleTotalView = () => {
    const obj = {
      user_id: this.props.user_id,
      totalView: 1,
      index: this.props.index
    };
    axios
      .patch("/users/update-links-views", obj)
      .then(res => {})
      .catch(e => {});
  };

  //Icon
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
  handleModalOpen = async item => {
    await this.setState({
      placeholder: item.placeholder,
      icon: item.icon,
      link: item.link ? item.link : "none",
      title: item.title,
      link1: ""
    });
    this.setState({ onModal: false });
  };
  handleModalClose = () => {
    this.setState({ onModal: true });
  };
  render() {
    const { full_colored_button } = this.props;
    return !this.props.isPublic ? (
      <div>
        <ConfirmModal
          onSubmit={this.handleFormSubmit}
          onClose={this.handleEdit}
          isOpen={this.state.isEdit}
          iconOption={this.handleModalClose}
          state={this.state}
          handleInputChange={this.handleInputChange}
          loading={this.state.loading}
        />
        <Modal isOpen={this.state.onModal} contentLabel="Select Icon">
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
                        <img src={item.icon} alt="" className="img-fluid" />
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
                        <img src={item.icon} alt="" className="img-fluid" />
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
                        <img src={item.icon} alt="" className="img-fluid" />
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
                        <img src={item.icon} alt="" className="img-fluid" />
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
                        <img src={item.icon} alt="" className="img-fluid" />
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
                        <img src={item.icon} alt="" className="img-fluid" />
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
                        <img src={item.icon} alt="" className="img-fluid" />
                        <h3>{item.title}</h3>
                      </div>
                    );
                })}
              </div>
            </Tab>
          </Tabs>
        </Modal>
        <div
          className="collapsible-header"
          aria-controls="example-collapse-text"
        >
          <div
            className="header-desc"
            style={{
              backgroundColor: !full_colored_button
                ? "#fff"
                : this.props.linkDesc.bcColor
            }}
          >
            {!this.props.textCentered && (
              <div className="social-logo">
                <img
                  src={
                    this.props.linkDesc.avatar
                      ? this.props.linkDesc.avatar
                      : "/img/blang_img.png"
                  }
                  alt="social"
                />
              </div>
            )}
            <div
              className={
                !this.props.textCentered
                  ? "social-head"
                  : "social-head text-center textCentered"
              }
            >
              <h4 className="site">{this.props.linkDesc.title}</h4>
              <p>{this.props.linkDesc.desc}</p>
            </div>
          </div>
          <div className="view">
            {this.props.full_colored_button && (
              <div className="link">
                {/* <label htmlFor="desc" style={{ padding: '0px 5px 0 0' }}>Button Color:</label> */}
                <ColorPicker
                  defaultC={this.props.linkDesc.bcColor}
                  setColor={this.setColor}
                />
              </div>
            )}
            <div
              style={{
                marginRight: "5px",
                marginTop: "2px"
              }}
            >
              <Switch
                onChange={this.handleChange}
                checked={
                  this.state.checked !== null
                    ? this.state.checked
                    : this.props.linkDesc.enable
                }
                type="checked"
                height={20}
                width={35}
              />
            </div>
            <Icon
              path={mdiTrashCanOutline}
              size="18px"
              color="red"
              onClick={this.handleLinkDelete}
              style={{ cursor: "pointer", marginRight: "10px",marginLeft: "10px"}}
            />
            <Icon
              path={mdiPencil}
              size="18px"
              color="#000000"
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={this.handleEdit}
            />
            {console.log(this.props.linkDesc)}
            <a
              href=""
              target="_blank"
              onClick={e => {
                e.preventDefault();
                this.redirectToLink()
              }}
            >
              <Icon
                path={mdiLinkVariant}
                size="18px"
                color="#569CD6"
                style={{ cursor: "pointer", marginRight: "15px" }}
              />
            </a>
            <Icon path={mdiEyeOutline} size="18px" color="#000000" />
            <div className="count">{this.props.linkDesc.totalView}</div>
          </div>
        </div>
      </div>
    ) : (
      this.props.linkDesc.enable && (
        <div onClick={this.redirectToLink}>
          <div className="collapsible-header">
            <div
              className="header-desc"
              style={{
                backgroundColor: !full_colored_button
                  ? "#fff"
                  : this.props.linkDesc.bcColor,
                padding: "12px 11px"
              }}
            >
              {!this.props.textCentered && (
                <div className="social-logo">
                  <img src={this.props.linkDesc.avatar} alt="social" />
                </div>
              )}
              <div
                className={
                  !this.props.textCentered
                    ? "social-head"
                    : "social-head text-center textCentered"
                }
              >
                <h4 className="site">{this.props.linkDesc.title}</h4>
                <p>{this.props.linkDesc.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}
const mapPropsToState = state => ({
  icons: state.auth.icons
});

export default connect(mapPropsToState, { reload, setIcons })(SingleItem);
