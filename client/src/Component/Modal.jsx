import React from "react";

const Modal = ({ children, title }) => {
  return (
    <div className="modal">
      <div className="modal__wrapper">
        <div className="modal__form">
          <h3>{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
