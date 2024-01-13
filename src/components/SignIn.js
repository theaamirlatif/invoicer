import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../app/misc/authSlice";
import { Helmet } from "react-helmet";

const SignIn = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.sessionStorage.getItem("id")) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLoginEvent = (e) => {
    e.preventDefault();
    let userCredentials = {
      email,
      password,
    };

    // Dispatch the login action
    dispatch(loginUser(userCredentials)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/Dashboard");
      }
    });
  };

  const userId = window.sessionStorage.getItem("id");
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 500);
  }, [userId]);

  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
          <Helmet>
              <meta charSet="utf-8" />
              <title>SignIn | Invoicer</title>
              <link rel="canonical" href="http://mysite.com/example" />
              <meta name="description" content="Dashboard Invoicer" />
          </Helmet>
        {/* <!-- Spinner Start --> */}
        {showSpinner && (
          <>
            {" "}
            <Spinner />{" "}
          </>
        )}
        {/* <!-- Spinner End --> */}

        {/* <!-- Sign In Start --> */}
        <div className="container-fluid" style={{ backgroundColor: "#e3e4ee" }}>
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
              <div className="bg-white rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <Link className="">
                    <h3 className="text-body">
                      <i className="fa fa-user-edit me-2"></i>INVOICER
                    </h3>
                  </Link>
                  <h3 className="text-dark">Sign In</h3>
                </div>
                {error && (
                  <div
                    className="alert alert-danger alert-dismissible"
                    style={{
                      backgroundColor: "red",
                      padding: "15px",
                      color: "white",
                    }}
                  >
                    {error}
                  </div>
                )}
                <form
                  className="form-group custom-form"
                  onSubmit={handleLoginEvent}
                >
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control text-dark border"
                      style={{ backgroundColor: "#e3e4ee" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control text-dark border"
                      style={{ backgroundColor: "#e3e4ee" }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input bg-white"
                        id="exampleCheck1"
                        style={{display: "none"}}
                        checked={isChecked}
                        onChange={(event) => setIsChecked(event.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                        style={{display: "none"}}
                      >
                        Check me out
                      </label>
                    </div>
                    <a href="/abc">Forgot Password</a>
                  </div>
                  <button
                    className="btn btn-light py-2 w-100 mb-3"
                    type="submit"
                  >
                    {loading ? "Loading..." : "SIGN IN"}
                  </button>
                </form>
                {/* <p className="text-center mb-0">
                  Dawn Analytical Supplies & Calibration!
                  Don't have an Account? <a href="/abc">Sign Up</a>
                </p> */}
                <p className="text-center mb-0">
                  Don't have an Account?{" "}
                  <NavLink to="/SignUp" className="text-dark">
                    SingUp!
                  </NavLink>
                </p>
                <p className="text-center mb-0">
                  Developer Assist!{" "}
                  <a
                    href="https://portify.netlify.app/"
                    className="text-dark"
                    target="blank"
                  >
                    Click here!
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Sign In End --> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;
