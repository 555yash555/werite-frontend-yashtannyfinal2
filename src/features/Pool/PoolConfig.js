import React, { useState } from "react";
import { Card } from "react-bootstrap";
import CreatePool from "./CreatePool";
import ManageTiles from "./ManageTiles";
import ManageRequests from "./ManageRequests";
import { useSelector } from "react-redux";
import Message from "../../components/Message";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const PoolConfig = () => {
  const configs = ["create pool", "manage tiles", "manage requests"];
  const [currentConfig, setCurrentConfig] = useState(0);

  const handleConfigChangeForward = () => {
    setCurrentConfig((currentConfig + 1) % configs.length);
    console.log(currentConfig);
  };

  const handleConfigChangeBackward = () => {
    setCurrentConfig((currentConfig - 1 + configs.length) % configs.length);
  };

  const Pool = useSelector((state) => state.createPool);
  const { loading, error, message } = Pool;

  return (
    <>
      {message && <Message variant="success">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <Card className="mt-3 p-3" style={{ borderRadius: "20px" }}>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="mt-1"
        >
          <div
            style={{ cursor: "pointer", display: "block" }}
            onClick={handleConfigChangeBackward}
          >
            <FaArrowAltCircleLeft size={30} style={{ color: "gray" }} />
          </div>
          {configs[currentConfig] === "create pool" && (
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.7rem",
                paddingBottom: "10px",
                borderBottom: "3px solid black",
              }}
            >
              Create Pool
            </h1>
          )}
          {configs[currentConfig] === "manage tiles" && (
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.7rem",
                paddingBottom: "10px",
                borderBottom: "3px solid black",
              }}
            >
              Manage Tiles
            </h1>
          )}
          {configs[currentConfig] === "manage requests" && (
            <h1
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.7rem",
                paddingBottom: "10px",
                borderBottom: "3px solid black",
              }}
            >
              Manage Requests
            </h1>
          )}
          <div
            style={{ cursor: "pointer", display: "block" }}
            onClick={handleConfigChangeForward}
          >
            <FaArrowAltCircleRight size={30} style={{ color: "gray" }} />
          </div>
        </div>
        {configs[currentConfig] === "create pool" && <CreatePool />}
        {configs[currentConfig] === "manage tiles" && <ManageTiles />}
        {configs[currentConfig] === "manage requests" && <ManageRequests />}
      </Card>
    </>
  );
};

export default PoolConfig;
