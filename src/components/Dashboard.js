import React, { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";
import Spinner from "./inc/Spinner";
import { productList } from "../app/misc/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { quotationList } from "../app/misc/QuotationSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quotations, setQuotations] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.sessionStorage.getItem("id")) {
      navigate("/Dashboard");
    } else {
      navigate("/");
    }
  }, []);

  const dispatch = useDispatch();
  const { product, quotation } = useSelector((state) => ({
    product: state.product,
    quotation: state.quotation,
  }));
  const userId = window.sessionStorage.getItem("id");

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

  useEffect(() => {
    dispatch(quotationList(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(quotationList(userId)).then((result) => {
      if (result.payload && result.payload.quotations) {
        setQuotations(result.payload.quotations);
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
          <Helmet>
              <meta charSet="utf-8" />
              <title>Dashboard | Invoicer</title>
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
                  <i className="fa fa-user-secret fa-3x text-body"></i>
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
                  <i className="fa fa-users fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Quotations</p>
                    <h6 className="mb-0 text-dark">
                      {Array.isArray(quotations) && quotations.length}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-blog fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Invoices</p>
                    <h6 className="mb-0 text-dark">0
                      {/* {Array.isArray(products) && products.length} */}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-wind fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Sales</p>
                    <h6 className="mb-0 text-dark">0
                      {/* {Array.isArray(products) && products.length} */}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Sale & Revenue End --> */}

          {/* <!-- Sales Chart Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-6">
                <div className="bg-white text-center rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0 text-dark">Product Sales</h6>
                    <a href="/abc">Show All</a>
                  </div>
                  <canvas id="worldwide-sales"></canvas>
                </div>
              </div>
              <div className="col-sm-12 col-xl-6 d-none">
                <div className="bg-white text-center rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h6 className="mb-0 text-dark">Salse & Revenue</h6>
                    <a href="/abc">Show All</a>
                  </div>
                  <canvas id="salse-revenue"></canvas>
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
          {/* <!-- Sales Chart End --> */}

          {/* <!-- Recent Sales Start --> */}
          <div className="container-fluid pt-4 px-4 d-none">
            <div className="bg-white text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0 text-dark">Recent Salse</h6>
                <NavLink to="" className="text-dark">
                  Show All
                </NavLink>
              </div>
              <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0 text-dark">
                  <thead>
                    <tr className="text-dark">
                      <th scope="col">
                        <input
                          className="form-check-input bg-white"
                          type="checkbox"
                        />
                      </th>
                      <th scope="col">Date</th>
                      <th scope="col">Invoice</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          className="form-check-input bg-white"
                          type="checkbox"
                        />
                      </td>
                      <td>01 Jan 2045</td>
                      <td>INV-0123</td>
                      <td>Jhon Doe</td>
                      <td>$123</td>
                      <td>Paid</td>
                      <td>
                        <NavLink className="btn btn-sm btn-light" to="">
                          Detail
                        </NavLink>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className="form-check-input bg-white"
                          type="checkbox"
                        />
                      </td>
                      <td>01 Jan 2045</td>
                      <td>INV-0123</td>
                      <td>Jhon Doe</td>
                      <td>$123</td>
                      <td>Paid</td>
                      <td>
                        <NavLink className="btn btn-sm btn-light" to="">
                          Detail
                        </NavLink>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className="form-check-input bg-white"
                          type="checkbox"
                        />
                      </td>
                      <td>01 Jan 2045</td>
                      <td>INV-0123</td>
                      <td>Jhon Doe</td>
                      <td>$123</td>
                      <td>Paid</td>
                      <td>
                        <NavLink className="btn btn-sm btn-light" to="">
                          Detail
                        </NavLink>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className="form-check-input bg-white"
                          type="checkbox"
                        />
                      </td>
                      <td>01 Jan 2045</td>
                      <td>INV-0123</td>
                      <td>Jhon Doe</td>
                      <td>$123</td>
                      <td>Paid</td>
                      <td>
                        <NavLink className="btn btn-sm btn-light" to="">
                          Detail
                        </NavLink>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          className="form-check-input bg-white"
                          type="checkbox"
                        />
                      </td>
                      <td>01 Jan 2045</td>
                      <td>INV-0123</td>
                      <td>Jhon Doe</td>
                      <td>$123</td>
                      <td>Paid</td>
                      <td>
                        <NavLink className="btn btn-sm btn-light" to="">
                          Detail
                        </NavLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <!-- Recent Sales End --> */}

          {/* <!-- Widgets Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-md-6 col-xl-4 d-none">
                <div className="h-100 bg-white rounded p-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="mb-0 text-dark">Messages</h6>
                    <NavLink to="" className="text-dark">
                      Show All
                    </NavLink>
                  </div>
                  <div className="d-flex align-items-center border-bottom py-3">
                    <img
                      className="rounded-circle flex-shrink-0"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-dark">Jhon Doe</h6>
                        <small>15 minutes ago</small>
                      </div>
                      <span>Short message goes here...</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center border-bottom py-3">
                    <img
                      className="rounded-circle flex-shrink-0"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-dark">Jhon Doe</h6>
                        <small>15 minutes ago</small>
                      </div>
                      <span>Short message goes here...</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center border-bottom py-3">
                    <img
                      className="rounded-circle flex-shrink-0"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-dark">Jhon Doe</h6>
                        <small>15 minutes ago</small>
                      </div>
                      <span>Short message goes here...</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center pt-3">
                    <img
                      className="rounded-circle flex-shrink-0"
                      src="img/user.jpg"
                      alt=""
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0 text-dark">Jhon Doe</h6>
                        <small>15 minutes ago</small>
                      </div>
                      <span>Short message goes here...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-xl-6 d-none">
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
          {/* <!-- Widgets End --> */}

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

export default Dashboard;
