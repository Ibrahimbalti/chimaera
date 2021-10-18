import React from "react";
import { Modal, Button } from "react-bootstrap";
import QRCode from 'qrcode.react'

class QrModal extends React.Component {
  handleDownload = () =>{
    try {
      const canvas = document.getElementById('qr-code')
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      let downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = 'QR.png'
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    } catch (error) {
    }
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The QR code</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{textAlign: 'center'}}
        >
          <QRCode
            id="qr-code"
            value={JSON.stringify(this.props.publicURL)}
            size={250}
            level="Q"
            includeMargin={true}
            fgColor='#000000'
            imageSettings={{
              src: '/img/with-text.png',
              height: 50,
              width: 50,
              excavate: true
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button className="btn modal-save" onClick={this.handleDownload} style={{fontWeight: 'bold'}}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default QrModal;
