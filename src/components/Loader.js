import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ small }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      size={small ? "sm" : "lg"}
      style={{
        margin: "auto",
        display: "block",
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loader;
