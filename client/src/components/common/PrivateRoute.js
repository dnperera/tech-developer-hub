import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return auth.isAuthenticate === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
//map Redux state to component props
const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(PrivateRoute);
