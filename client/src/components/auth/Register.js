import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    //if you do not use arrow function for the method , you need to bind that method with this
    //this.onChange=this.onChange.bind(this);
    //this.onSubmit=this.onSubmit.bind(this);
  }
  //if the user already logged in , if user try to access login page via address bar , it will be directed to dashboard page .
  componentDidMount() {
    if (this.props.auth.isAuthenticate) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your Tech Developer Hub account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  placeholder="Full Name"
                  value={this.state.name}
                  error={errors.name}
                  type="text"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="email"
                  placeholder="Email Address"
                  value={this.state.email}
                  error={errors.email}
                  type="email"
                  onChange={this.onChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  error={errors.password}
                  type="password"
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  name="password2"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  error={errors.password2}
                  type="password"
                  onChange={this.onChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Maping prop types
Register.prototypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = ({ auth, errors }) => {
  return { auth, errors };
};
// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//     errors:state.errors
//   };
// }
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
