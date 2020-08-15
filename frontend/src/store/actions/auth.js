import * as actionTypes from "./actionTypes";
import axios from "axios";

// Now we create Action creators, functions that return an action,(which consists of types and optional payload containing extra information to pass to the reducer).

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: token,
});

export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  payload: error,
});

export const logout = () => {
  // to logout the user we need to remove the credentials from localstorage
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// method to check whether our expiration date has expired
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

// we also need to handle what we needs to be done when we login and when we logout
// dispatch is basically a call to action

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart);
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        // once you are successfully logged in the django-rest-framework returns a token(key)
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart);
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        // once you are successfully logged in the django-rest-framework returns a token(key)
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token == undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout);
      } else {
        dispatch(authSuccess(token));
        //dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000)
      }
    }
  };
};
