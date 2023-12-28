import React, { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../app/misc/ProductSlice";

const AllQuotations = () => {
  //Products
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product); // Assuming your product slice is named 'product'
  const userId = window.sessionStorage.getItem("id");

  console.log("pro", products);
  useEffect(() => {
    dispatch(productList(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Component is mounted");
    console.log("User ID:", userId);

    dispatch(productList(userId)).then((result) => {
      console.log("Product list fetched successfully");
      if (result.payload && result.payload.products) {
        setProducts(result.payload.products);
      }
    });
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

          {/* <!-- Sale & Revenue Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-6 col-xl-3">
                <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-line fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Quotations</p>
                    <h6 className="mb-0 text-dark">
                      {Array.isArray(products) && products.length}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-bar fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Invoices</p>
                    <h6 className="mb-0 text-dark">
                      {Array.isArray(products) && products.length}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-area fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Products</p>
                    <h6 className="mb-0 text-dark">
                      {Array.isArray(products) && products.length}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-pie fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Sales</p>
                    <h6 className="mb-0 text-dark">
                      {Array.isArray(products) && products.length}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Sale & Revenue End --> */}

          {/* <!-- Table Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="bg-white rounded h-100 p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0 text-dark">All Quotations</h6>
                    <NavLink to="/Quotation" className="text-dark">
                      Add Quotation
                    </NavLink>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">Password</th>
                          <th scope="col">Country</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {user &&
                          user.map((item) => (
                            <tr key={item.id}>
                              <th>{item.id}</th>
                              <td>{item.username}</td>
                              <td>{item.email}</td>
                              <td>{item.password}</td>
                              <td>Pakistan</td>
                              <td>{item.ustatus}</td>
                              <td>{item.created_at}</td>
                              <td style={{ display: "flex" }}>
                                <Link
                                  to={"/UserEnteries"}
                                  className="btn btn-outline-success"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <a className="btn btn-outline-danger">
                                  <i className="fa fa-trash"></i>
                                </a>
                              </td>
                            </tr>
                          ))} */}
                        <tr>
                          <td
                            colSpan="6"
                            style={{ textAlign: "center", fontSize: "25px" }}
                          >
                            {loading ? (
                              "Loading..."
                            ) : (
                              <strong>"No Quotations Available!"</strong>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-xl-6">
                <div className="h-100 bg-white rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0 text-dark">Calender</h6>
                    <NavLink to="" className="text-dark">
                      Show All
                    </NavLink>
                  </div>
                  <div id="calender"></div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Table End --> */}

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
      <ToastContainer theme="colored" position="top-center" />
    </>
  );
};

export default AllQuotations;
