import React, { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import { NavLink } from "react-router-dom";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../app/misc/ProductSlice";
import { quotationList } from "../app/misc/QuotationSlice";
import { Helmet } from "react-helmet";

const AllInvoices = () => {
  //Products
  const [products, setProducts] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const dispatch = useDispatch();
  const { loading, product, quotation } = useSelector((state) => ({
    product: state.product,
    quotation: state.quotation,
  }));
  const userId = window.sessionStorage.getItem("id");

  console.log("pro", products);
  useEffect(() => {
    dispatch(productList(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(productList(userId)).then((result) => {
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
              <title>All Invocies | Invoicer</title>
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
          {/* <!-- Sales Chart End --> */}

          {/* <!-- Recent Sales Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="bg-white text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0 text-dark">All Invoices</h6>
                <NavLink to="/Invoice" className="text-dark">
                  Add Invoice
                </NavLink>
              </div>
              <div className="table-responsive">
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                  <thead>
                    <tr className="text-dark">
                      <th scope="col">Sr.</th>
                      <th scope="col">Title</th>
                      <th scope="col">Keywords</th>
                      <th scope="col">Description</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {story &&
                      story.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.stitle}</td>
                          <td>{item.skeyword}</td>
                          <td>{item.sdesc}</td>
                          <td>{item.created_at}</td>
                          <td>{item.status}</td>
                          <td style={{ display: "flex" }}>
                            <a href="/abc" className="btn btn-outline-success">
                              <i className="fa fa-edit"></i>
                            </a>
                            <a
                              href="/abc"
                              className="btn btn-outline-info"
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                            >
                              <i className="fa fa-info-circle"></i>
                            </a>
                            <a href="/abc" className="btn btn-outline-danger">
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
                          <strong>"No Invoices Available!"</strong>
                        )}
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
              <div className="col-sm-12 col-md-6 col-xl-6 d-none">
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
                        <h6 className="mb-0">Jhon Doe</h6>
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
                        <h6 className="mb-0">Jhon Doe</h6>
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
                        <h6 className="mb-0">Jhon Doe</h6>
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
                        <h6 className="mb-0">Jhon Doe</h6>
                        <small>15 minutes ago</small>
                      </div>
                      <span>Short message goes here...</span>
                    </div>
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

export default AllInvoices;
