import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import Spinner from "./inc/Spinner";
import { Helmet } from "react-helmet";

const Customer = () => {
  const userId = window.sessionStorage.getItem("id");
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    setShowSpinner(true);
    setTimeout(() => {
      setShowSpinner(false);
    }, 500);
  }, [userId]);

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const searchResultsRef = useRef(null);
  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((respose) => respose.json())
      .then((json) => {
        const resultsFilter = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(resultsFilter);
        console.log(results);
      });
  };

  const handleChange = (value) => {
    setSearchInput(value);
    fetchData(value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setResults([]);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
          <Helmet>
              <meta charSet="utf-8" />
              <title>Add Customer | Invoicer</title>
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

          {/* <!-- Form Start --> */}
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-sm-12 col-xl-12">
                <div className="bg-white rounded h-100 p-4">
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">Add Customer Details</h6>
                      <NavLink to="/AllInvoices" className="text-dark">
                        See All
                      </NavLink>
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
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row mb-12">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-12 col-form-label"
                          >
                            Client Name
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              value={searchInput}
                              onChange={(e) => handleChange(e.target.value)}
                              placeholder="Write client name"
                            />
                            <div className="search-results" ref={searchResultsRef}>
                              {results.map((result, id) => {
                                return (
                                  <div className="results" key={id}>
                                    {result.name}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row mb-12">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-12 col-form-label"
                          >
                            Company Name
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              //   value={formData.clientCompany}
                              //   onChange={(event) =>
                              //     setFormData({
                              //       ...formData,
                              //       clientCompany: event.target.value,
                              //     })
                              //   }
                              required
                              placeholder="Write company name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row mb-12">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-12 col-form-label"
                          >
                            Client Address
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              //   value={formData.clientAddress}
                              //   onChange={(event) =>
                              //     setFormData({
                              //       ...formData,
                              //       clientAddress: event.target.value,
                              //     })
                              //   }
                              placeholder="Write client address"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row mb-12">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-12 col-form-label"
                          >
                            Client Mobile
                          </label>
                          <div className="col-md-12">
                            <input
                              type="number"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              //   value={formData.clientPhone}
                              //   onChange={(event) =>
                              //     setFormData({
                              //       ...formData,
                              //       clientPhone: event.target.value,
                              //     })
                              //   }
                              placeholder="Write client mobile"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="row mb-12">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-12 col-form-label"
                          >
                            Descrption
                          </label>
                          <div className="col-md-12">
                            <textarea
                              type="text"
                              className="form-control text-dark border"
                              style={{
                                height: "72px",
                                backgroundColor: "#e3e4ee",
                                textAlign: "start!important",
                              }}
                              required
                              //   value={formData.clientDesc}
                              //   onChange={(event) =>
                              //     setFormData({
                              //       ...formData,
                              //       clientDesc: event.target.value,
                              //     })
                              //   }
                              placeholder="Write your statements"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="button"
                        // onClick={() => setShowInvoiceModal(true)}
                        className="btn btn-light"
                        value="submit"
                        // disabled={
                        //   !formData.clientName ||
                        //   !formData.clientCompany ||
                        //   !formData.clientAddress ||
                        //   !formData.clientPhone ||
                        //   !formData.clientDesc
                        // }
                      >
                        Add Customer
                      </button>
                    </div>
                  </form>
                  <hr></hr>
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">Already Customers List</h6>
                      <form className="d-none d-md-flex ms-4">
                        <input
                          className="form-control border-0"
                          type="search"
                          style={{ backgroundColor: "#e3e4ee" }}
                          placeholder="Search"
                          //   value={searchTerm}
                          //   onChange={(event) => {
                          //     setSearchTerm(event.target.value);
                          //     console.log("Search term:", event.target.value);
                          //   }}
                        />
                      </form>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                      <thead>
                        <tr className="text-dark">
                          <th scope="col">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              //   checked={
                              //     filteredProductList &&
                              //     filteredProductList.every(
                              //       (item) => item.checked
                              //     )
                              //   }
                              //   onChange={handleSelectAllChange}
                            />
                          </th>
                          <th scope="col">Sr.</th>
                          <th scope="col">Model</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Product Category</th>
                          <th scope="col">Product Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </td>
                          <td>index + 1</td>
                          <td>p.pmodel</td>
                          <td>p.pname</td>
                          <td>p.pcat</td>
                          <td>p.prate</td>
                        </tr>
                      </tbody>
                    </table>
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

export default Customer;
