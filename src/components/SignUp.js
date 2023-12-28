import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../app/misc/authSlice";

const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.sessionStorage.getItem("id")) {
      navigate("/Dashboard");
    }
  }, []);

  const [isChecked, setIsChecked] = useState(false);
  const [uname, setUsername] = useState("");
  const [umob, setMobile] = useState("");
  const [ucaddress, setAddress] = useState("");
  const [ucname, setUCName] = useState("");
  const [ucimg, setUCImg] = useState("");
  const [ucmob, setUCMob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUCImg(file);
  };

  const handleRegister = () => {
    if (!uname || !umob || !ucaddress || !email || !password) {
      setAlertMessage("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      setAlertMessage("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setAlertMessage("Password must be at least 6 characters long");
      return;
    }

    const formData = new FormData();
    formData.append("uname", uname);
    formData.append("umob", umob);
    formData.append("ucaddress", ucaddress);
    formData.append("ucname", ucname);
    formData.append("ucimg", ucimg);
    formData.append("ucmob", ucmob);
    formData.append("email", email);
    formData.append("password", password);

    dispatch(registerUser(formData)).then((result) => {
      if (result.error) {
        setAlertMessage(result.error);
      } else {
        setAlertMessage("Registration successful");
        setUsername("");
        setUCImg("");
        setMobile("");
        setUCMob("");
        setUCName("");
        setAddress("");
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 500);
  }, []);

  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
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
            <div className="col-md-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="bg-white rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <NavLink className="">
                    <h3 className="text-body">
                      <i className="fa fa-user-edit me-2"></i>INVOICER
                    </h3>
                  </NavLink>
                  <h3 className="text-dark">Sign Up</h3>
                </div>
                {alertMessage && (
                  <div className="alert alert-danger" role="alert">
                    {alertMessage}
                  </div>
                )}
                {error ? (
                  <div className="alert alert-danger alert-dismissible">
                    {error}
                  </div>
                ) : (
                  <></>
                )}
                <form encType="multipart/form-data">
                  <div className="detailsContainer">
                    <div className="detailsLeft">
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control text-dark border"
                          style={{ backgroundColor: "#e3e4ee" }}
                          value={uname}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Fullname"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="number"
                          className="form-control text-dark border"
                          style={{ backgroundColor: "#e3e4ee" }}
                          value={umob}
                          onChange={(e) => setMobile(e.target.value)}
                          placeholder="Mobile Number"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control text-dark border"
                          style={{ backgroundColor: "#e3e4ee" }}
                          value={ucname}
                          onChange={(e) => setUCName(e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
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
                    </div>
                    <div className="detailsRight">
                      <div className="mb-3">
                        <input
                          type="file"
                          className="form-control text-dark border"
                          style={{ backgroundColor: "#e3e4ee" }}
                          id={ucimg}
                          onChange={handleFileChange}
                          placeholder="Select"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="number"
                          className="form-control text-dark border"
                          style={{ backgroundColor: "#e3e4ee" }}
                          value={ucmob}
                          onChange={(e) => setUCMob(e.target.value)}
                          placeholder="Company Number"
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control text-dark border"
                          style={{ backgroundColor: "#e3e4ee" }}
                          value={ucaddress}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Company Address"
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
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-check" style={{ display: "none" }}>
                      <input
                        type="checkbox"
                        className="form-check-input bg-white"
                        id="exampleCheck1"
                        checked={isChecked}
                        onChange={(event) => setIsChecked(event.target.checked)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleCheck1"
                      >
                        I agree to the{" "}
                        <NavLink className="text-dark" to="">
                          Terms of Service
                        </NavLink>{" "}
                        &{" "}
                        <NavLink className="text-dark" to="">
                          Privacy Policy.
                        </NavLink>
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn btn-light py-2 w-100 mb-3"
                    type="button"
                    onClick={handleRegister}
                  >
                    {loading ? "Loading..." : "SIGN UP"}
                  </button>
                </form>
                <p className="text-center mb-0">
                  Already have an Account?{" "}
                  <NavLink to="/" className="text-dark">
                    SingIn!
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

export default SignUp;
