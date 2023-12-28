import { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../app/misc/authSlice";
import { NavLink } from "react-router-dom";

const Settings = () => {
  const dispatch = useDispatch();
  const userId = window.sessionStorage.getItem("id");
  const [admin, setAdmin] = useState(null);

  // Select relevant data from the Redux store
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(fetchUserData(userId));

        console.log("User data fetched successfully");

        if (result.payload) {
          setAdmin(result.payload);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, [dispatch, userId]);

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
        {/* <!-- Spinner Start --> */}
        {showSpinner && (
          <>
            {" "}
            <Spinner />{" "}
          </>
        )}
        {/* <!-- Spinner End --> */}

        {/* <!-- Sidebar Start --> */}
        <Sidebar />
        {/* <!-- Sidebar End --> */}

        {/* <!-- Content Start --> */}
        <div className="content">
          {/* <!-- Navbar Start --> */}
          <Navbar />
          {/* <!-- Navbar End --> */}

          {/* <!-- Form Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12 ">
                <div className="bg-white rounded h-100 p-4">
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">Admin Settings</h6>
                      <a href="/#" className="text-dark">
                        Edit
                      </a>
                    </div>
                    {/* <div className="col-md-6">
                      <h6
                        className="mb-4"
                        style={{ textAlign: "right", color: "green" }}
                      >
                        {errors}
                      </h6>
                    </div> */}
                  </div>
                  <div className="row">
                    <div className="d-flex justify-content-center align-item-center bg-green">
                      <form
                        style={{
                          width: "80%",
                          padding: "25px",
                          borderRadius: "10px",
                          boxShadow: "1px 2px 9px #F4AAB9",
                        }}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row mb-6">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-6 col-form-label text-dark"
                                style={{ fontWeight: "bold" }}
                              >
                                Profile Picture:
                              </label>
                              <div className="col-md-6">
                                {admin ? (
                                  <img
                                    src={admin.ucimg}
                                    alt="profile"
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      marginBottom: "20px",
                                      borderRadius: "50px",
                                      border: "none",
                                    }}
                                  />
                                ) : (
                                  <>loading...</>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row mb-6">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-6 col-form-label text-dark"
                                style={{ fontWeight: "bold" }}
                              >
                                Client Name:
                              </label>
                              <div className="col-md-6">
                                {admin ? (
                                  <p
                                    className="form-control"
                                    style={{
                                      backgroundColor: "#e3e4ee",
                                      border: "none",
                                    }}
                                  >
                                    {admin.uname}
                                  </p>
                                ) : (
                                  <>loading...</>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row mb-6">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-6 col-form-label text-dark"
                                style={{ fontWeight: "bold" }}
                              >
                                Client Mobile:
                              </label>
                              <div className="col-md-6">
                                {admin ? (
                                  <p
                                    className="form-control"
                                    style={{
                                      backgroundColor: "#e3e4ee",
                                      border: "none",
                                    }}
                                  >
                                    {admin.umob}
                                  </p>
                                ) : (
                                  <>loading...</>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row mb-6">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-6 col-form-label text-dark"
                                style={{ fontWeight: "bold" }}
                              >
                                Company Name:
                              </label>
                              <div className="col-md-6">
                                {admin ? (
                                  <p
                                    className="form-control"
                                    style={{
                                      backgroundColor: "#e3e4ee",
                                      border: "none",
                                    }}
                                  >
                                    {admin.ucname}
                                  </p>
                                ) : (
                                  <>loading...</>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row mb-6">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-6 col-form-label text-dark"
                                style={{ fontWeight: "bold" }}
                              >
                                Client Address:
                              </label>
                              <div className="col-md-6">
                                {admin ? (
                                  <p
                                    className="form-control"
                                    style={{
                                      backgroundColor: "#e3e4ee",
                                      border: "none",
                                    }}
                                  >
                                    {admin.ucaddress}
                                  </p>
                                ) : (
                                  <>loading...</>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row mb-6">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-12 col-form-label text-dark"
                                style={{ fontWeight: "bold" }}
                              >
                                Privacy Policy Alerts:
                              </label>
                              <div className="col-md-12">
                                <p
                                  className="form-control"
                                  style={{
                                    backgroundColor: "#e3e4ee",
                                    border: "none",
                                    padding: "20px",
                                  }}
                                  required
                                  placeholder="Write your statements"
                                >
                                  * Share only essential information. <br></br>*
                                  Avoid disclosing sensitive details like
                                  addresses or financial information. <br></br>*
                                  Consider the platform and audience when
                                  sharing details. <br></br>* Regularly review
                                  and update privacy settings. <br></br>*
                                  Prioritize{" "}
                                  <NavLink className="text-dark" to="">
                                    Privacy
                                  </NavLink>{" "}
                                  and{" "}
                                  <NavLink className="text-dark" to="">
                                    Security
                                  </NavLink>{" "}
                                  when sharing profile information. <br></br>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row d-none">
                          <div className="d-flex justify-content-end mt-3">
                            <button
                              type="button"
                              className="btn btn-light d-none"
                              value="submit"
                            >
                              Update Settings
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Footer Start --> */}
          <Footer />
          {/* <!-- Footer End --> */}
        </div>
        {/* <!-- Form End --> */}
        {/* <!-- Content End --> */}

        {/* <!-- Back to Top --> */}
        <a href="/#" className="btn btn-lg btn-light btn-lg-square back-to-top">
          <i className="bi bi-arrow-up"></i>
        </a>
      </div>
    </>
  );
};

export default Settings;
