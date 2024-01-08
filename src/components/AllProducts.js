import React, { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { productList } from "../app/misc/ProductSlice";
import { quotationList } from "../app/misc/QuotationSlice";
import { Helmet } from "react-helmet";

function AllProducts() {
  //Products
  const [products, setProducts] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = window.sessionStorage.getItem("id");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);
  const dispatch = useDispatch();
  const { loading, product, quotation } = useSelector((state) => ({
    product: state.product,
    quotation: state.quotation,
  }));

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

  //search details table
  useEffect(() => {
    console.log("product", products);
    const filteredProducts = products.filter((p) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      return (
        p.id.toString().includes(searchTermLowerCase) ||
        p.pmodel.toLowerCase().includes(searchTermLowerCase) ||
        p.pname.toLowerCase().includes(searchTermLowerCase) ||
        p.pcat.toLowerCase().includes(searchTermLowerCase)
      );
    });
    setFilteredProductList(filteredProducts);
    console.log("filter", filteredProducts);
  }, [products, searchTerm]);

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
              <title>All Products | Invoicer</title>
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

          {/* <!-- Table Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="bg-white rounded h-100 p-4">
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">All Products</h6>
                      <NavLink to="/Product" className="text-dark">
                        Add Product
                      </NavLink>
                    </div>
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
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                      <thead>
                        <tr className="text-dark">
                          <th scope="col">Sr.</th>
                          <th scope="col">Model</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Product Category</th>
                          <th scope="col">Product Descrption</th>
                          {/* <th scope="col">Action</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProductList &&
                        filteredProductList.length > 0 ? (
                          filteredProductList.map((p, index) => (
                            <tr key={p.id}>
                              <td>{index + 1}</td>
                              <td>{p.pmodel}</td>
                              <td>{p.pname}</td>
                              <td>{p.pcat}</td>
                              <td>{p.prate}</td>
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
                                <strong>"No Products Available!"</strong>
                              )}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-responsive" style={{ display: "none" }}>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">Password</th>
                          <th scope="col">Country</th>
                          <th scope="col">Status</th>
                          <th scope="col">Add Date</th>
                          <th scope="col">Action</th>
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
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-xl-6 d-none">
                <div className="bg-white rounded h-100 p-4">
                  <h6 className="mb-4">Basic Table</h6>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>John</td>
                        <td>Doe</td>
                        <td>jhon@email.com</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>mark@email.com</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>jacob@email.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-sm-12 col-xl-6 d-none">
                <div className="bg-white rounded h-100 p-4">
                  <h6 className="mb-4">Accented Table</h6>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>John</td>
                        <td>Doe</td>
                        <td>jhon@email.com</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>mark@email.com</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>jacob@email.com</td>
                      </tr>
                    </tbody>
                  </table>
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
        <a
          href="/abc"
          className="btn btn-lg btn-light btn-lg-square back-to-top"
        >
          <i className="bi bi-arrow-up"></i>
        </a>
      </div>
      <ToastContainer theme="colored" position="top-center" />
    </>
  );
}

export default AllProducts;
