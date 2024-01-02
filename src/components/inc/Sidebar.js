import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "../../app/misc/authSlice";

const Sidebar = () => {
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


  // console.log("...admins", admin);

  return (
    <>
      {/* <!-- Sidebar Start --> */}
      <div className="sidebar pe-4 pb-3">
        <nav className="navbar navbar-dark">
          {/* <NavLink to="/Dashboard"> */}
          <NavLink className="navbar-brand mx-4 mb-3">
            <h3 className="text-body">
              <i className="fa fa-user-edit me-2"></i>Invoicer
            </h3>
          </NavLink>
          {/* </NavLink> */}
          <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              {admin && admin.ucimg ? (
                <img
                  className="rounded-circle"
                  src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg" //{"storage/app/" + admin.ucimg}
                  alt="img"
                  style={{ width: "40px", height: "40px" }}
                />
              ) : (
                <p>Loading...</p>
              )}
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div className="ms-3">
              {admin ? (
                <>
                  <h6 className="mb-0 text-dark">{admin.uname}</h6>
                  <span>Admin</span>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className="navbar-nav w-100">
            <NavLink to="/Dashboard" className="nav-item nav-link">
              <i className="fa fa-tachometer-alt me-2 text-dark"></i>Dashboard
              {/* <NavLink to="/Dashboard">Dashboard</NavLink> */}
            </NavLink>
            <div className="nav-item dropdown">
              <NavLink
                to="/#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <i className="fa fa-database me-2 text-dark"></i>Misc Entries
              </NavLink>
              <div className="dropdown-menu bg-transparent border-0">
                <NavLink to="/Product" className="dropdown-item">
                  <i className="far fa-circle me-2 text-dark"></i>Add New
                  Product
                </NavLink>
                <NavLink to="/Customer" className="dropdown-item" style={{display: "none"}}>
                  <i className="far fa-circle me-2 text-dark"></i>New Customer
                  {/* <NavLink to="/Publishers">Publishes</NavLink> */}
                </NavLink>
                <NavLink to="/Quotation" className="dropdown-item">
                  <i className="far fa-circle me-2 text-dark"></i>New Quotation
                  {/* <NavLink to="/UserEnteries">Accounts</NavLink> */}
                </NavLink>
                <NavLink to="/Invoice" className="dropdown-item">
                  <i className="far fa-circle me-2 text-dark"></i>New Inovice
                  {/* <NavLink to="/Publishers">Publishes</NavLink> */}
                </NavLink>
                <NavLink to="/Error" className="dropdown-item d-none">
                  <i className="far fa-circle me-2 text-dark"></i>404 Error
                  {/* <NavLink to="/AdsPlay">Ads Play</NavLink> */}
                </NavLink>
              </div>
            </div>
            <NavLink to="/AllProducts" className="nav-item nav-link">
              <i className="fa fa-stroopwafel me-2 text-dark"></i>All Products
            </NavLink>
            <NavLink to="/AllInvoices" className="nav-item nav-link">
              <i className="fa fa-blog me-2 text-dark"></i>All Inovices
            </NavLink>
            <NavLink to="/AllQuotations" className="nav-item nav-link">
              <i className="fa fa-user me-2 text-dark"></i>All Quotations
            </NavLink>
            <NavLink to="/Logout" className="nav-item nav-link">
              <i className="fa fa-sign-out-alt me-2 text-dark"></i>Logout
            </NavLink>
          </div>
        </nav>
      </div>
      {/* <!-- Sidebar End --> */}
    </>
  );
};

export default Sidebar;
