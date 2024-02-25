import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  addMyBio,
  addMyProfile,
  getMyPosts,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userSearchReducer,
  resetPasswordReducer,
} from "./reducers/userReducers";
import {
  createPoolReducer,
  getPoolsReducer,
  getMyPoolsReducer,
  createPoolRequestReducer,
  getMyPoolRequestsReducer,
} from "./reducers/poolReducers.js";
import { getNotificationsReducer } from "./reducers/notificationReducers";
import { videoRecordingDetailsReducer } from "./reducers/videoRecordingReducers";
import { getUpVotes, removeLike, upVoteVideo } from "./reducers/upVoteReducers";
import {
  downVoteVideo,
  getDownVotes,
  removeDislike,
} from "./reducers/downVoteReducers";

import { commentReducers,commentUpvotesReducer,commentDownvotesReducer,commentDownvoteReducer,commentUpvoteReducer } from "./reducers/commentReducers";
import { getAllUsersReducer,poolReducer,getAllReportsReducer } from "./reducers/adminReducers.js";
import { postCreateReducer,getAllPostss,getPostReducer,deletePostReducer } from "./reducers/postReducers.js";
import { reportPostReducer } from "./reducers/reportReducer.js";
import {blockUserReducer,unblockUserReducer,getBlockedUsersReducer} from "./reducers/blockReducers.js";
import { editPoolReducer } from "./reducers/editPoolReducers.js";
import {bookmarkPostReducer,removeBookmarkReducer} from "./reducers/bookedMarkReducers.js";
import { chatReducers,sendMessageReducer,getMessagesReducer } from "./reducers/messageReducers.js";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  createPool: createPoolReducer,
  getPools: getPoolsReducer,
  getMyPools: getMyPoolsReducer,
  createPoolRequest: createPoolRequestReducer,
  getMyPoolRequests: getMyPoolRequestsReducer,
  notifications: getNotificationsReducer,
  videoRecordings: videoRecordingDetailsReducer,
  addUpVoteVideos: upVoteVideo,
  getUpVotes: getUpVotes,
  addDownVoteVideos: downVoteVideo,
  getDownVotes: getDownVotes,
  commentReducer: commentReducers,
  removeLike: removeLike,
  removeDislike: removeDislike,
  getMyPosts: getMyPosts,
  addMyBio: addMyBio,
  addMyProfile: addMyProfile,
  postCreate: postCreateReducer,
  getAllPosts: getAllPostss,
  chatreducer:chatReducers,
  sendmessage:sendMessageReducer,
  getMessagesReducer:getMessagesReducer,
  userSearchReducer:userSearchReducer,
  userReducer:getAllUsersReducer,
  poolReducer:poolReducer,
  createReport:reportPostReducer,
  reportReducer:getAllReportsReducer,
  blockReducer:blockUserReducer,
  unblockReducer:unblockUserReducer,
  bookmarkReducer:bookmarkPostReducer,
  removeBookmarkReducer:removeBookmarkReducer,
  getBlockedUsers:getBlockedUsersReducer,
  getPostReducer:getPostReducer,
  deletePostReducer:deletePostReducer,
  commentUpvoteReducer:commentUpvoteReducer,
  commentDownvoteReducer:commentDownvoteReducer,
  commentUpvotesReducer:commentUpvotesReducer,
  commentDownvotesReducer:commentDownvotesReducer,
  editPoolReducer:editPoolReducer,
  resetPassword:resetPasswordReducer,

  


});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
