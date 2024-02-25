// components/PoolList.js

import React from 'react';

import { Container, Row, Col,Card } from 'react-bootstrap';

const PoolList = ({ pools }) => {
  return (
    <Container fluid>
      <Row>
        {pools.map((pool) => (
          <Col key={pool.pool_id} xs={12} sm={6} md={4} lg={3}>
            <>
      <Card
        style={{
          margin: "20px 10px",
          cursor: "pointer",
          borderRadius: "20px",
          color: "black",
          background: `white`,
        }}
        key={pool.pool_id}
        
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
                      style={{ color: `black`, marginRight: "5px" }}
                    />
                  
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
                  
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Card>
      <div>
        
      </div>
    </>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PoolList;