import React, { useRef, useState } from "react";
import randomColor from "randomcolor";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import PoolRequestModal from "../features/Pool/PoolRequestModal";
import moment from "moment";
import { useEffect } from "react";

const PoolCard = ({ pool, userStatus, color }) => {
  const [modalPoolInfo, setModalPoolInfo] = useState(null);
  const [show, setShow] = useState(false);
  

  const handleTileClick = (pool) => {
    setModalPoolInfo(pool);
    setShow(!show);
  };
  let statusColor;
  // const statusColor = pool.user.user_id === userStatus ? "green" : "yellow";
  const isFound = userStatus.some((user) => {
    if (user === pool.user.user_id) {
      return true;
    } else {
      return false;
    }
  });
  if (isFound) {
    statusColor = "green";
  } else {
    statusColor = "yellow";
  }
  return (
    <>
      <Card
        style={{
          margin: "20px 10px",
          cursor: "pointer",
          borderRadius: "20px",
          color: "#eee",
          background: `${color}`,
        }}
        key={pool.pool_id}
        onClick={() => handleTileClick(pool)}
      >
        <Col sm={12}>
          <Card.Body>
            <Row>
              <Col xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  className="mt-1"
                >
                  <span className="ms-1">
                    <i
                      className="fa-solid fa-circle"
                      style={{ color: `${statusColor}`, marginRight: "5px" }}
                    />
                    {moment(pool.created_at).fromNow()}
                  </span>
                  <span className="me-1">
                    <i
                      className={`fa-solid fa-user${
                        pool.discussion_type === "panel" ? "s" : ""
                      }`}
                    />
                    {pool.discussion_type === "panel" && (
                      <span style={{ marginLeft: "3px" }}>
                        1/{pool.people_allowed}
                      </span>
                    )}
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="my-5">
                <p style={{ margin: "0" }}>
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: "bolder",
                      textDecoration: "underline",
                    }}
                  >
                    {`${pool.title}`}{" "}
                  </span>
                </p>
                <p>
                  <span
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                  >{`(${pool.category})`}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                  className="mt-1"
                >
                  {pool.user.username}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Card>
      <div>
        {show && (
          <PoolRequestModal
            show={show}
            setShow={setShow}
            modalPoolInfo={modalPoolInfo}
          />
        )}
      </div>
    </>
  );
};

export default PoolCard;
