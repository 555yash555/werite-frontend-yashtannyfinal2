import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { getNotifications } from "../actions/notificationActions";

const Notifications = ({ notifications }) => {
  const PoolStart = ({ msg, link }) => {
    console.log(link);
    return (
      <div>
        {msg}.
        <Button
          variant="link"
          className="mx-0 px-0"
          onClick={() => window.open(link)}
        >
          Click here
        </Button>
        to join the discussion.
      </div>
    );
  };
  // const [cards, setCards] = useState([]);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    return () => {
      dispatch(getNotifications());
    };
  }, []);

  useEffect(() => {
    fetch(`/api/notifications/viewed`, {
      method: "PATCH",
      headers: {
        Authorization: `${userInfo.token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw "Error";
        }
      })
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {});
  }, []);

  // useEffect(() => {
  //   // console.log(notifications)
  //   const x =

  // }, [notifications]);
  let cards = useMemo(() => {
    return (
      notifications &&
      notifications.map((noti) => (
        // <ListGroup.Item>{noti.viewed? noti.message :<strong>{noti.message}</strong>}</ListGroup.Item>
        <ListGroup.Item>
          {noti.viewed ? (
            noti.type === "pool start" ? (
              <PoolStart msg={noti.message} link={noti.link} />
            ) : (
              noti.message
            )
          ) : (
            <strong>
              {noti.type === "pool start" ? (
                <PoolStart msg={noti.message} link={noti.link} />
              ) : (
                noti.message
              )}
            </strong>
          )}
        </ListGroup.Item>
      ))
    );
  }, [notifications]);

  return <ListGroup variant="flush">{cards}</ListGroup>;
};

export default Notifications;
