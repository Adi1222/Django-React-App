import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import "antd/dist/antd.css";

import BaseRouter from "./routes";
import CustomLayout from "./containers/Layout";
import * as actions from "./store/actions/auth";
import actionTypes from "./store/actions/actionTypes";

function App({ onTryAutoSignup, isAuthenticated }) {
  useEffect(() => {
    onTryAutoSignup();
  }, []);

  return (
    <div className="App">
      <Router>
        <CustomLayout {...isAuthenticated}>
          <BaseRouter />
        </CustomLayout>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  // mapping a state
  return {
    isAuthenticated: state.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  // mapping a dispatch
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
