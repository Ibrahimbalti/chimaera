import {
  GET_ERRORS,
  SET_CURRENT_USER,
  SET_DEFAULT_STATE,
  SET_ICONS,
  SET_BLOGS
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { toast } from "react-toastify";

export const facebookSignin = (userData, adminId) => dispatch =>
  new Promise((resolve, reject) => {
    axios
      .post("users/facebook-signin", {
        access_token: userData.accessToken,
        adminId
      })
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthToken(token);
        dispatch(setCurrentUser(res.data.user));
        // history.push("/user-admin");
        resolve(true);
      })
      .catch(err => {
        resolve(false);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  });
export const googleSignin = (id_token, adminId) => dispatch =>
  new Promise((resolve, reject) => {
    axios
      .post("users/google-signin", { id_token, adminId })
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthToken(token);
        dispatch(setCurrentUser(res.data.user));
        // history.push("/user-admin");
        resolve(true);
      })
      .catch(err => {
        resolve(false);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  });

//Register User
export const registeruser = userData => async dispatch => {
  return new Promise(function(resolve, reject) {
    axios
      .post("users/signup", userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthToken(token);
        dispatch(setCurrentUser(res.data.user));
        // return true
        resolve(true);
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        resolve(false);
      });
  });
};

export const login = (userData, history) => dispatch => {
  axios
    .post("users/signin", userData)
    .then(res => {
      history.push("/");
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAuthToken(token);
      dispatch(setCurrentUser(res.data.user));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateUser = userData => async dispatch => {
  await axios
    .patch("/users/me", userData)
    .then(res => {
      dispatch(setCurrentUser(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      // history.push("/user-admin");
      toast.success("Saved.");
    })
    .catch(err => {
      try {
        if (err.response.status === 401) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("user");
          localStorage.removeItem("socialIcons");
          dispatch(emptyStore());
        }
      } catch (err) {}
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data ? err.response.data : ""
      });
    });
};
export const setAutopilot = (userData, history) => dispatch => {
  axios
    .put("/users/autopilot", userData)
    .then(res => {
      dispatch(setCurrentUser(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      // history.push("/user-admin");
      toast.success("Saved.");
    })
    .catch(err => {
      try {
        if (err.response.status === 401) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("user");
          localStorage.removeItem("socialIcons");
          dispatch(emptyStore());
        }
      } catch (err) {}
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data ? err.response.data : ""
      });
    });
};
export const reload = userData => dispatch => {
  axios
    .get(`/users/me/${userData}`)
    .then(res => {
      dispatch(setCurrentUser(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch(err => {
      try {
        if (err.response.status === 401) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("user");
          localStorage.removeItem("socialIcons");
          dispatch(emptyStore());
        }
      } catch (err) {}
      // dispatch({
      //     type: GET_ERRORS,
      //     payload: err.response.data
      // })
    });
};
export const setIcons = () => dispatch => {
  axios
    .get("public/getAllIcons")
    .then(res => {
      dispatch(setIconsData(res.data));
      localStorage.setItem("socialIcons", JSON.stringify(res.data));
    })
    .catch(e => {
      try {
        if (e.response.status === 401) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("user");
          localStorage.removeItem("socialIcons");
          dispatch(emptyStore());
        }
      } catch (err) {}
    });
};
export const setBlog = () => dispatch => {
  axios
    .get("public/get-blogs")
    .then(res => {
      dispatch(setBlogData(res.data.blog));
    })
    .catch(e => {
      try {
        if (e.response.status === 401) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("user");
          localStorage.removeItem("socialIcons");
          dispatch(emptyStore());
        }
      } catch (err) {}
    });
};
export const setBlogData = payload => ({
  type: SET_BLOGS,
  payload
});
export const setIconsData = payload => ({
  type: SET_ICONS,
  payload
});
export const accoutDelete = history => dispatch => {
  history.push("/");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  localStorage.removeItem("socialIcons");
  dispatch(emptyStore());
  axios
    .delete(`/users/deleteAccount/`)
    .then(res => {})
    .catch(err => {});
};

export const setCurrentUser = payload => ({
  type: SET_CURRENT_USER,
  payload
});

export const logout = history => dispatch => {
  history.push("/");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  localStorage.removeItem("socialIcons");
  dispatch(emptyStore());
};
export const logout1 = () => dispatch => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
  localStorage.removeItem("socialIcons");
  dispatch(emptyStore());
};
const emptyStore = () => ({
  type: SET_DEFAULT_STATE
});
