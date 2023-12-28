import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "../../app/misc/authSlice";

const Navbar = () => {
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

  return (
    <>
      {/* <!-- Navbar Start --> */}
      <nav className="navbar navbar-expand bg-white navbar-dark sticky-top px-4 py-0">
        <a href="/Dashboard" className="navbar-brand d-flex d-lg-none me-4">
          <h2 className="text-dark mb-0">
            <i className="fa fa-user-edit"></i>
          </h2>
        </a>
        <a className="sidebar-toggler text-dark  flex-shrink-0">
          <i className="fa fa-bars"></i>
        </a>
        {/* <form className="d-none d-md-flex ms-4">
          <input
            className="form-control bg-white border"
            type="search"
            placeholder="Search"
          />
        </form> */}
        <div className="navbar-nav align-items-center ms-auto">
          <div className="nav-item dropdown" style={{ display: "none" }}>
            <a
              href="/#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-envelope me-lg-2"></i>
              <span className="d-none d-lg-inline-flex">Message</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <a href="/#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="img/user.jpg"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="ms-2">
                    <h6 className="fw-normal mb-0 text-dark">
                      Jhon send you a message
                    </h6>
                    <small>15 minutes ago</small>
                  </div>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a href="/#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="img/user.jpg"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="ms-2">
                    <h6 className="fw-normal mb-0 text-dark">
                      Jhon send you a message
                    </h6>
                    <small>15 minutes ago</small>
                  </div>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a href="/#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle"
                    src="img/user.jpg"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="ms-2">
                    <h6 className="fw-normal mb-0 text-dark">
                      Jhon send you a message
                    </h6>
                    <small>15 minutes ago</small>
                  </div>
                </div>
              </a>
              <hr className="dropdown-divider" />
              <a href="/#" className="dropdown-item text-center">
                See all message
              </a>
            </div>
          </div>
          <div className="nav-item dropdown" style={{ display: "none" }}>
            <a
              href="/#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-bell me-lg-2"></i>
              <span className="d-none d-lg-inline-flex">Notificatin</span>
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
              <a href="/#" className="dropdown-item">
                <h6 className="fw-normal mb-0 text-dark">Profile updated</h6>
                <small>15 minutes ago</small>
              </a>
              <hr className="dropdown-divider" />
              <a href="/#" className="dropdown-item">
                <h6 className="fw-normal mb-0 text-dark">New user added</h6>
                <small>15 minutes ago</small>
              </a>
              <hr className="dropdown-divider" />
              <a href="/#" className="dropdown-item">
                <h6 className="fw-normal mb-0 text-dark">Password changed</h6>
                <small>15 minutes ago</small>
              </a>
              <hr className="dropdown-divider" />
              <a href="/#" className="dropdown-item text-center">
                See all notifications
              </a>
            </div>
          </div>
          <div className="nav-item dropdown" style={{ paddingRight: "30px" }}>
            <a
              href="/#"
              className="nav-link dropdown-toggle d-flex justify-content-center align-items-center"
              data-bs-toggle="dropdown"
            >
              {admin && admin.ucimg ? (
                <>
                  <img
                    className="rounded-circle me-lg-2"
                    src={admin.ucimg} // Assuming admin.ucimg contains the image URL
                    alt="img"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <h6 className="mb-0 text-dark">{admin.uname}</h6>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </a>
            <div className="dropdown-menu dropdown-menu-end bg-white border-0 rounded-0 rounded-bottom m-0">
              <NavLink to="/#" className="dropdown-item d-none">
                My Profile
              </NavLink>
              <NavLink to="/Settings" className="dropdown-item">
                Settings
              </NavLink>
              <NavLink to="/Logout" className="dropdown-item">
                Log Out
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      {/* <!-- Navbar End --> */}
    </>
  );
};

export default Navbar;
