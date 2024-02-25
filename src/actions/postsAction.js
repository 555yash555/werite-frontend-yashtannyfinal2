import axios from 'axios';
import {
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
} from '../constants/postConstants.js'

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });
    let token = JSON.parse(localStorage.getItem("userInfo")).token;

    const formData = new FormData();
    for (const key in postData) {
      if (key === "attachments" && postData[key]) {
        for (let i = 0; i < postData[key].length; i++) {
          formData.append("attachments", postData[key][i]);
        }
        
      }
      else{formData.append(key, postData[key]);}
      console.log(key, postData[key]);
      
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,

      }
    };
    console.log(formData);
    const { data } = await axios.post('/api/post/', formData, config);

    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload: error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
export const getAllPosts = (sortByName, sortByDate,rev) => async (dispatch, getState) => {
  console.log(sortByName);
  console.log(sortByDate);
  console.log('rev is',rev);
  if(rev===undefined){
    rev=true;
  }
  try {
    dispatch({
      type: "GET_ALL_POSTS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    let query = "/api/post/";

if (sortByName) {
  query += `?sortByName=${sortByName}`;
  
} else if (sortByDate) {
  query += `?sortByDate=${sortByDate}`;
}
console.log(query);

let { data } = await axios.get(query, config);
if(!rev){
  data=data.reverse();
}
console.log("heyyyyyyyyyy i am postttttttt data");
console.log(data);

    dispatch({
      type: "GET_ALL_POSTS_SUCCESS",
      payload: data,
    });
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
    dispatch({
      type: "GET_ALL_POSTS_FAIL",
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};






export const getPostById = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'GET_POST_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/post/${postId}`, config);
    console.log("ghuishd",data)

    dispatch({ type: 'GET_POST_SUCCESS', payload: data });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'GET_POST_FAIL',
      payload: error.response ? error.response.data.message : 'Something went wrong',
    });
  }
};


export const deletePostById = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'DELETE_POST_REQUEST' });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${userInfo.token}`,
      },
    };

    await axios.delete(`/api/post/${postId}`, config);

    dispatch({ type: 'DELETE_POST_SUCCESS', payload: postId });
  } catch (error) {
    console.error(error);
    dispatch({
      type: 'DELETE_POST_FAIL',
      payload: error.response ? error.response.data.message : 'Something went wrong',
    });
  }
};