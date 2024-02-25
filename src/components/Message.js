import React, { useState } from "react";
import { Toast, ToastContainer, ToastBody, ToastHeader } from "react-bootstrap";

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer
      position="top-end"
      style={{ marginTop: "70px", zIndex: "10000" }}
    >
      <Toast
        delay={1000}
        autohide
        show={show}
        onClose={() => setShow(false)}
        animation={true}
        bg={variant}
      >
        <ToastHeader>
          <strong
            className="me-auto"
            style={{ fontSize: "1.3rem", fontWeight: "bold" }}
          >
            {variant === "danger" ? "Error" : "Success"}
          </strong>
        </ToastHeader>

        <ToastBody style={{ fontSize: "1rem", fontWeight: "bolder" }}>
          {children}
        </ToastBody>
      </Toast>
    </ToastContainer>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
