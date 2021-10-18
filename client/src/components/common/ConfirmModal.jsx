import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({
  isOpen,
  onClose,
  onSubmit,
  iconOption,
  state,
  handleInputChange,
  loading
}) => (
  <Modal show={isOpen} onHide={onClose}>
    <Modal.Body>
      <div className="links-form">
        <div className="text-center edit-icon">
          <img src={`${state.icon}`} alt="" />
        </div>
        <div className="link">
          <label htmlFor="title">custom label:</label>
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="link">
          <label htmlFor="desc">Description:</label>
          <input
            type="text"
            name="desc"
            value={state.desc}
            onChange={handleInputChange}
          />
        </div>
        <div className="link">
          <label htmlFor="desc">{state.placeholder || ''}</label>
          <input
            type="text"
            name="link1"
            placeholder={state.placeholder || ""}
            value={state.link1 && state.link1.replace(/\s/g,'')}
            onChange={handleInputChange}
          />
        </div>
        <div className="fun">
          <button onClick={iconOption}>Change Icon</button>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
      <Button className="btn modal-save" onClick={onSubmit}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </Modal.Footer>
    {/* </div> */}
  </Modal>
);

export default ConfirmModal;
