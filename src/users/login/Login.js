import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import brand from "../../assets/images/brand.png";
import * as alertActions from "../../redux/alert/alert.actions";
import * as userActions from "../../redux/user/user.actions";

const Login = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  let [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
  });
  console.log("test", abc);
  let validateEmail = (event) => {
    setUser({ ...user, email: event.target.value });
    let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, emailError: "Enter a Proper Email" })
      : setUserError({ ...userError, emailError: "" });
  };
  let validatePassword = (event) => {
    setUser({ ...user, password: event.target.value });
    let regExp = /^[A-Za-z]\w{7,14}$/;
    !regExp.test(event.target.value)
      ? setUserError({ ...userError, passwordError: "Enter a Proper Password" })
      : setUserError({ ...userError, passwordError: "" });
  };
  let submitLogin = (event) => {
    event.preventDefault();
    //console.log(user);
    if (user.email !== "" && user.password !== "") {
      dispatch(userActions.loginUser(user, history));
    } else {
      dispatch(alertActions.setAlert("Please fill in the fields", "danger"));
    }
  };
  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 m-auto">
              <div className="card animated zoomIn">
                <div className="card-header bg-teal text-white text-center">
                  <p className="h3">Login Here</p>
                </div>
                <div className="card-body bg-light-blue">
                  <form onSubmit={submitLogin}>
                    <div className="form-group">
                      <input
                        name="email"
                        value={user.email}
                        onChange={validateEmail}
                        type="email"
                        className={`form-control ${
                          userError.emailError.length > 0 ? "is-invalid" : ""
                        }`}
                        placeholder="Email"
                      />
                      {userError.emailError.length > 0 ? (
                        <small className="text-danger">
                          {userError.emailError}
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        name="password"
                        value={user.password}
                        onChange={validatePassword}
                        type="password"
                        className={`form-control ${
                          userError.passwordError.length > 0 ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
                      />
                      {userError.passwordError.length > 0 ? (
                        <small className="text-danger">
                          {userError.passwordError}
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        className="btn btn-teal btn-sm"
                        value="Login"
                      />
                    </div>
                    <small>
                      Don't have an Account ?{" "}
                      <Link
                        to="/users/register"
                        className="font-weight-bold text-teal"
                      >
                        Register
                      </Link>
                    </small>
                  </form>
                </div>
                <div className="card-footer text-center">
                  <img src={brand} alt="" width="160px" height="40px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
