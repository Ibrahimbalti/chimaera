import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import axios from "axios";
import { setIcons } from "../actions/authAction";
import MenuCom from "./common/Menu";
import { toast } from "react-toastify";
import appConfig from "../config/config";
const stripePublicKey = appConfig.stripePulicKye;
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY || "pk_test_mTbz95I1kySBRX0yUeWKQPYR00tF3MUeFG";

class Payment extends React.Component {
  state = {
    key: "Chimaera plus",
    chacked: "month",
    product: {
      name: "Chimaera plus",
      price: 4.97
    },
    product1: {
      name: "Chimaera gold",
      price: 9.97
    }
  };
  componentDidMount() {
    this.props.setIcons("addlink");
    const socialIcon = JSON.parse(localStorage.getItem("socialIcons"));
    this.setState({ icons: socialIcon.socialIcon });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ icons: nextProps.icons.socialIcon });
  }
  handleModalClose = () => this.setState({ show: false });
  handleModalOpen = item => this.setState({ sigleIcon: item, show: true });
  handleTabs = key => {
    if (key === "Chimaera plus") {
      this.setState({ key });
    } else {
      this.setState({ key });
    }
  };
  handleToken = async (token, addresses) => {
    let product;
    if (this.state.key === "Chimaera plus") {
      product = this.state.product;
    } else {
      product = this.state.product1;
    }
    const response = await axios.post("/users/checkout", { token, product });
    const { status } = response.data;
    if (status === "success") {
      toast.success("Success! Check email for details");
      this.props.history.push("/");
    } else {
      toast("Something went wrong");
    }
  };
  handleChimaeraPlus = e => {
    this.setState({
      product: { name: "Chimaera plus", price: e.target.value }
    });
  };
  handleChimaeraPlusGold = e => {
    this.setState({
      product1: { name: "Chimaera gold", price: e.target.value }
    });
  };
  render() {
    const priceOfProduct1 = Math.round(this.state.product1.price * 100);
    return (
      <section id="add-link" className="payment">
        <MenuCom />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tab-outer">
                <div className="add-link-title">
                  <h2>Become a premium user.</h2>
                </div>
                <p style={{ textAlign: "center", marginBottom: "20px" }}>
                  <a
                    href="https://www.chimaera.co/share/example"
                    target=" _blank"
                  >
                    Chimaera Gold example here
                  </a>
                </p>
                <Tabs
                  id="controlled-tab-example"
                  activeKey={this.state.key}
                  onSelect={key => this.handleTabs(key)}
                >
                  <Tab eventKey="Chimaera plus" title="Chimaera Plus">
                    <div className="card">
                      <h3>Chimaera Plus</h3>
                      <div className="para-box mt-3">
                        <p>Hide Sponsored Links</p>
                      </div>
                      <div className="radio-box mt-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="4.97"
                            name="defaultCheck-1"
                            defaultChecked={
                              this.state.chacked === "month" ? true : false
                            }
                            onChange={this.handleChimaeraPlus}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Pay Monthly
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="44"
                            name="defaultCheck-1"
                            defaultChecked={false}
                            onChange={this.handleChimaeraPlus}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck2"
                          >
                            Pay Yearly
                          </label>
                        </div>
                      </div>
                      <div className="price-box mt-4">
                        <p>Price: (USD) ${this.state.product.price}</p>
                      </div>
                      <div className="stripe-btn mt-3">
                        <StripeCheckout
                          stripeKey={stripePublicKey}
                          token={this.handleToken}
                          amount={this.state.product.price * 100}
                          name={this.state.product.name}
                          // billingAddress
                          // shippingAddress
                        />
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="Chimaera gold" title="Chimaera Gold">
                    <div className="card">
                      <h3>Chimaera Gold</h3>
                      <div className="para-box mt-3">
                        <p>Hide Sponsored Links</p>
                        <p>Discreet Chimaera Branding</p>
                        <p>All Premium Features</p>
                        <p>Includes All Future Features</p>
                      </div>
                      <div className="radio-box mt-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="9.97"
                            name="defaultCheck"
                            defaultChecked={
                              this.state.chacked === "month" ? true : false
                            }
                            onChange={this.handleChimaeraPlusGold}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck1"
                          >
                            Pay Monthly
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="99"
                            name="defaultCheck"
                            defaultChecked={false}
                            onChange={this.handleChimaeraPlusGold}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="defaultCheck2"
                          >
                            Pay Yearly
                          </label>
                        </div>
                      </div>
                      <div className="price-box mt-4">
                        <p>Price: (USD) ${this.state.product1.price}</p>
                      </div>
                      <div className="stripe-btn mt-2">
                        <StripeCheckout
                          stripeKey={stripePublicKey}
                          token={this.handleToken}
                          amount={priceOfProduct1}
                          name={this.state.product1.name}
                          // billingAddress
                          // shippingAddress
                        />
                      </div>
                    </div>
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

const mapPropsToState = stroe => ({
  icons: stroe.auth.icons,
  err: stroe.err
});

export default connect(mapPropsToState, { setIcons })(Payment);
