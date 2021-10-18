import React from "react";
import { Link } from "react-router-dom";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import Icon from "@mdi/react";
import { toast } from "react-toastify";
import "../container/custom";
import { SingleItem, Sponsore } from ".";

import {
  mdiFacebook,
  mdiTwitter,
  mdiWhatsapp,
  mdiLinkedin,
  mdiEmailOutline,
  mdiContentCopy,
  mdiQrcode
} from "@mdi/js";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton
} from "react-share";
import QrModal from "./QR";
import CopyToClipboard from "react-copy-to-clipboard";
import Axios from "axios";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { reload } from "../actions/authAction";
import { connect } from "react-redux";
toast.configure();



// const commonjsArgs = {
//   include: 'node_modules/**',
//   // needed for react-is via react-redux
//   // https://stackoverflow.com/questions/50080893/rollup-error-isvalidelementtype-is-not-exported-by-node-modules-react-is-inde/50098540
//   namedExports: {
//     'node_modules/react-redux/node_modules/react-is/index.js': [
//       'isValidElementType',
//       'isContextConsumer',
//     ],
//     'node_modules/react-is/index.js': [
//       'isValidElementType',
//       'isContextConsumer',
//     ],
//     'node_modules/react-redux/es/components/connectAdvanced.js': [
//       'isContextConsumer',
//     ],
//   },
// };

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};



class SlinkCard extends React.Component {
  state = {
    items: []
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    let items = [];
    if (Array.isArray(nextProps.slinkLinks)) {
      items = nextProps.slinkLinks.map((item, index) => ({
        id: `item-${index}`,
        content: this.itemRenderer(item, index)
      }));
    }
    this.setState({ items: items })
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleRLDDChange = newItems => {
    Axios.post("users/update-card", { card: newItems })
      .then(res => {
        this.props.reload(this.props.user_id);
        toast.success('Saved.')
      })
      .catch(err => {
        toast.error("Something went wrong!");
      });
  };
  itemRenderer = (item, index) => {
    return (
      <SingleItem
        index = {index}
        isPublic={this.props.isPublic}
        linkDesc={item}
        user_id={this.props.user_id}
        textCentered={this.props.textCentered}
        full_colored_button={this.props.full_colored_button}
      />
    );
  };
  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    const newLinks = items.map(item=> item.content.props.linkDesc)
    this.handleRLDDChange(newLinks)
    this.setState({
      items
    });
  }


  render() {
    const { isPublic } = this.props;
    const shareUrl = `Hey! Join me on Chimaera, where you can display your entire online identity and share it in one place. ${this.props.publicURL}`;
    return (
      <div className="slink-card">
        <div className="social-links">
          <QrModal
            handleClose={this.handleClose}
            publicURL={this.props.publicURL}
            show={this.state.show}
          />
          {!isPublic ? (
            <DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}

                  >
                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            // <RLDD
            //   cssClasses="example"
            //   items={this.state.items}
            //   itemRenderer={this.itemRenderer}
            //   onChange={this.handleRLDDChange}
            // />
          ) : (
              this.props.slinkLinks.map((item, index) => (
                <SingleItem
                  isPublic={this.props.isPublic}
                  linkDesc={item}
                  key={index}
                  index={index}
                  user_id={this.props.user_id}
                  textCentered={this.props.textCentered}
                  full_colored_button={this.props.full_colored_button}
                />
              ))
            )}
          {this.props.sponsore && !this.props.hideSponsore && (
            <Sponsore
              sponsore={this.props.sponsore}
              textCentered={this.props.textCentered}
            />
          )}
        </div>
        {this.props.socialSharing && (
          <div className="share">
            <div className="social-share">
              <FacebookShareButton
                style={{ cursor: "pointer" }}
                url={this.props.publicURL}
                quote="Hey! Join me on Chimaera, where you can display your entire online identity and share it in one place."
              >
                <Icon path={mdiFacebook} size="20px" color="#3B5998" />
              </FacebookShareButton>
              <TwitterShareButton
                style={{ cursor: "pointer" }}
                url={this.props.publicURL}
                via={shareUrl}
              >
                <Icon path={mdiTwitter} size="20px" color="#1FA1F2" />
              </TwitterShareButton>

              <LinkedinShareButton
                style={{ cursor: "pointer" }}
                url={this.props.publicURL}
                source="www.chimaera.co"
                summary="Hey! Join me on Chimaera, where you can display your entire online identity and share it in one place."
                title="Hey! Join me on Chimaera."
              >
                <Icon path={mdiLinkedin} size="20px" color="#0073B2" />
              </LinkedinShareButton>

              <WhatsappShareButton style={{ cursor: "pointer" }} url={shareUrl}>
                <Icon path={mdiWhatsapp} size="20px" color="#0CC042" />
              </WhatsappShareButton>

              <EmailShareButton
                style={{ cursor: "pointer" }}
                subject="Hey! Join me on Chimaera"
                url={this.props.publicURL}
                body="Hey! Join me on Chimaera, where you can display your entire online identity and share it in one place."
              >
                <Icon path={mdiEmailOutline} size="20px" color="#d93025" />
              </EmailShareButton>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0",
                  cursor: "pointer"
                }}
                onClick={this.handleShow}
              >
                <Icon path={mdiQrcode} size="23px" color="#E59900" />
              </button>
              <CopyToClipboard
                style={{ cursor: "pointer" }}
                text={this.props.publicURL}
                onCopy={() => toast("Copied.")}
              >
                <Link to="#">
                  <Icon path={mdiContentCopy} size="20px" color="#0065C3" />
                </Link>
              </CopyToClipboard>
            </div>
          </div>
        )}
        <div className="share share-brand">
          <Link to="/signup" style={{ color: "#8c8ca9" }}>
            <img src="/img/logo.png" alt="" />
            {this.props.hide_chimaera === false && (
              <span>
                Powered by Chimaera. Click Here to Try Chimaera for Free
              </span>
            )}
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { reload })(SlinkCard);

