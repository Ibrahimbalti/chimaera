import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import download from "downloadjs";
import axios from "axios";
import queryString from "query-string";
import SlinkCard from "./SlinkCard";
import { Preloader } from ".";

class PublicCard extends React.Component {
  state = {
    count: 0,
    displayedName: "",
    designation: "",
    bio: "",
    slinkLinks: [],
    sponsore: undefined,
    socialSharing: true,
    profileBc: "#fff",
    avatar: "",
    _id: "",
    avatarLink: "",
    layout: "",
    rounded_corner: true,
    hide_icons: "",
    hide_sponsore: "",
    cardEmail: "",
    phone: "",
    address: "",
    publicURL: "",
    hide_chimaera: false,
    full_colored_button: false,
    emailProvider: true
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(`/public/${this.props.match.params.userName}`)
      .then(res => {
        this.setState(res.data);
        const { totalView, userName } = res.data;
        axios.patch(`/public/${this.props.match.params.userName}`, {
          totalView: totalView + 1,
          userName
        });
      })
      .catch(err => {
        const parsed = queryString.parse(this.props.location.search);
        if (!parsed.invite) {
          this.props.history.push("/");
        } else {
          try {
            const uuid = this.props.location.pathname.split("share/")[1];
            localStorage.setItem('invieId', uuid)
            this.props.history.push("/signup", { uuid });
          } catch (err) {
            this.props.history.push("/");
          }
        }
      });
    axios
      .get(`/public/getSponsore/${this.props.match.params.userName}`)
      .then(res => {
        this.setState({ sponsore: res.data });
      })
      .catch(err => {});
  }

  render() {
    if (!this.state.displayedName) {
      return <Preloader />;
    } else {
      return (
        <React.Fragment>
          <section id="admin">
            <Container>
              <Row>
                <Col sm={this.state.layout === "horizontal" ? 2 : 3}></Col>
                <Col sm={this.state.layout === "horizontal" ? 8 : 6}>
                  <div
                    className={
                      this.state.rounded_corner
                        ? `business-card ${this.state.layout === "horizontal" &&
                            "horizontal"}`
                        : `business-card rounded-0 ${this.state.layout ===
                            "horizontal" && "horizontal"}`
                    }
                  >
                    <div
                      className={
                        this.state.rounded_corner
                          ? "profile"
                          : "profile rounded-0"
                      }
                    >
                      <div className="profile-inner text-center">
                        <div
                          className="circular--portrait"
                          style={{
                            backgroundImage: `url(${this.state.avatar ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})`,
                            border: "7px solid #FE0501"
                          }}
                        ></div>

                        <div className="name">
                          <h4>{this.state.displayedName}</h4>
                          <p>{this.state.designation}</p>
                        </div>
                      </div>
                    </div>
                    <div className="slink-group">
                      <div className="header">
                        <div className="social-head d-flex align-items-center">
                          <pre className="site">{this.state.bio}</pre>
                        </div>
                      </div>
                      <div
                        className="addres-user"
                        style={{
                          display:
                            this.state.cardEmail ||
                            this.state.phone ||
                            this.state.address
                              ? "inline-block"
                              : "block",
                          marginTop: "0"
                        }}
                      >
                        {this.state.emailProvider && (
                          <>
                            {this.state.cardEmail && (
                              <div className="d-flex">
                                <img
                                  src="/img/mail.png"
                                  alt=""
                                  style={{ width: "23px", height: "23px" }}
                                />
                                <a href={`mailto:${this.state.cardEmail}`}>
                                  {this.state.cardEmail}
                                </a>
                              </div>
                            )}
                            {this.state.phone && (
                              <div className="d-flex">
                                <img
                                  src="/img/phone.png"
                                  alt=""
                                  style={{ width: "25px", height: "25px" }}
                                />
                                <a href={`tel:${this.state.phone}`}>
                                  {this.state.phone}
                                </a>
                              </div>
                            )}
                            {this.state.address && (
                              <div className="d-flex">
                                <img
                                  src="/img/location.png"
                                  alt=""
                                  style={{ width: "25px", height: "25px" }}
                                />
                                <p style={{ color: "#8c8ca9" }}>
                                  {this.state.address}
                                </p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="add-contact text-center">
                        <button
                          className="d-flex justify-content-between"
                          onClick={async () => {
                            const res = await fetch(
                              `/public/vcf/${this.props.match.params.userName}`
                            );
                            const blob = await res.blob();
                            download(blob, `${this.state.displayedName}.vcf`, 'text/vcard');
                          }}
                        >
                          Add To Contacts
                          <img src="/img/down.png" alt="" />
                        </button>
                      </div>
                      <SlinkCard
                        isPublic={true}
                        socialSharing={this.state.socialSharing}
                        slinkLinks={this.state.slinkLinks}
                        user_id={this.state._id}
                        sponsore={this.state.sponsore}
                        textCentered={this.state.hide_icons}
                        hideSponsore={this.state.hide_sponsore}
                        account_type={this.state.account_type}
                        publicURL={this.state.publicURL}
                        hide_chimaera={this.state.hide_chimaera}
                        full_colored_button={this.state.full_colored_button}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </React.Fragment>
      );
    }
  }
}
export default PublicCard;
