import io from "socket.io-client";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const socket = io("http://localhost:8080", {
  path: "/notification",
  query: { token: userInfoFromStorage ? userInfoFromStorage.token : "" },
});

export default socket;
