import React, { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { quotationList } from "../app/misc/QuotationSlice";
import { productList } from "../app/misc/ProductSlice";
import { Helmet } from "react-helmet";

const AllQuotations = () => {
  //Quotations
  const [quotations, setQuotations] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuotationList, setFilteredQuotationList] = useState([]);

  const userId = window.sessionStorage.getItem("id");
  const dispatch = useDispatch();
  const { loading, product, quotation } = useSelector((state) => ({
    product: state.product,
    quotation: state.quotation,
  }));

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

  //search details table
  useEffect(() => {
    console.log("product", quotations);
    const filteredQuotations = quotations.filter((q) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        q.id.toString().includes(searchTermLowerCase) ||
        q.cqname.toLowerCase().includes(searchTermLowerCase) ||
        q.cqphone.toLowerCase().includes(searchTermLowerCase) ||
        q.cqaddress.toLowerCase().includes(searchTermLowerCase)
      );
    });
    setFilteredQuotationList(filteredQuotations);
    console.log("filter", filteredQuotations);
  }, [quotations, searchTerm]);

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
              <title>All Quotations | Invoicer</title>
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
                  <i className="fa fa-chart-line fa-3x text-body"></i>
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
                  <i className="fa fa-chart-bar fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Invoices</p>
                    <h6 className="mb-0 text-dark">0
                      {/* {Array.isArray(quotations) && quotations.length} */}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-3">
                <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-pie fa-3x text-body"></i>
                  <div className="ms-3">
                    <p className="mb-2 fw-bold">Sales</p>
                    <h6 className="mb-0 text-dark">0
                      {/* {Array.isArray(quotations) && quotations.length} */}
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
                  <div className="row" style={{ marginBottom: "-10px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0"></h6>
                      <form className="d-none d-md-flex ms-4">
                        <input
                          className="form-control border-0"
                          type="search"
                          style={{ backgroundColor: "#e3e4ee" }}
                          placeholder="Search"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Customer Phone</th>
                          <th scope="col">Customer Address</th>
                          <th scope="col">Quotation Date</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {filteredQuotationList &&
                        filteredQuotationList.length > 0 ? (
                          filteredQuotationList.map((q, index) => (
                            <tr key={q.id}>
                              <td>{index + 1}</td>
                              <td>{q.cqname}</td>
                              <td>{q.cqphone}</td>
                              <td>{q.cqaddress}</td>
                              <td>{q.qdate}</td>
                              <td style={{ display: "flex" }}>
                                <Link
                                  className="btn btn-outline-info"
                                  >
                                    <i className="fa fa-eye"></i>
                                </Link>
                                {/* <Link
                                  className="btn btn-outline-success"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                >
                                  <i className="fa fa-edit"></i>
                                </Link> */}
                                {/* <Link
                                  // onClick={() => delProduct(p.id)}
                                  className="btn btn-outline-danger"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link> */}
                              </td>
                            </tr>
                          ))
                        ) : (
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
                        )}
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
