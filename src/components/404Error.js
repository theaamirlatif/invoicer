import React, { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import Spinner from "./inc/Spinner";
import { NavLink } from "react-router-dom";

const Error = () => {
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
        {showSpinner && <> <Spinner /> </>}
        {/* <!-- Spinner End --> */}

        {/* <!-- Sidebar Start --> */}
        <Sidebar />
        {/* <!-- Sidebar End --> */}

        {/* <!-- Content Start --> */}
        <div className="content">
          {/* <!-- Navbar Start --> */}
          <Navbar />
          {/* <!-- Navbar End --> */}

          {/* <!-- 404 Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row bg-white vh-100 bg-secondary rounded align-items-center justify-content-center mx-0">
              <div className="col-md-6 text-center p-4">
                <i className="bi bi-exclamation-triangle display-1 text-dark"></i>
                <h1 className="display-1 fw-bold text-dark">404</h1>
                <h1 className="mb-4 text-dark">Page Not Found</h1>
                <p className="mb-4 text-dark">
                  We’re sorry, the page you have looked for does not exist in
                  our website! Maybe go to our home page or try to use a search?
                </p>
                <a className="btn btn-light rounded-pill py-3 px-5" href="/">
                  Go Back To Home
                </a>
              </div>
            </div>
          </div>
          {/* <!-- 404 End --> */}

          {/* <!-- Footer Start --> */}
          <Footer />
          {/* <!-- Footer End --> */}
        </div>
        {/* <!-- Content End --> */}

        {/* <!-- Back to Top --> */}
        <NavLink
          to=""
          className="btn btn-lg btn-light btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up"></i>
        </NavLink>
      </div>
    </>
  );
};

export default Error;
