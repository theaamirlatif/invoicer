import { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import InvoiceView from "./inc/InvoiceView";
import Spinner from "./inc/Spinner";
import { productList } from "../app/misc/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const Invoice = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientDesc, setClientDesc] = useState("");
  const [btnText, setBtnText] = useState("Add Invoice");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const saveInvoice = async () => {
    setBtnText("Invoice Adding...");
    const formData = new FormData();
    formData.append("cqname", clientName);
    formData.append("cqcomp", clientCompany);
    formData.append("cqaddress", clientAddress);
    formData.append("cqphone", clientPhone);
    formData.append("cqdesc", clientDesc);

    try {
      const response = await fetch(window.api + "addInvoice", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        setErrors("Invoice Model already exists.");
        setBtnText("Add Invoice");
      } else {
        setSuccess("Invoice added successfully!");
        setClientName("");
        setClientCompany("");
        setClientAddress("");
        setClientPhone("");
        setClientDesc("");
        setBtnText("Add Invoice");
        navigate("/AllInvoices");
      }
    } catch (error) {
      setErrors("Error occurred while adding the product.");
      setBtnText("Add Invoice");
    }
  };

  const [formData, setFormData] = useState({
    issueDate: "",
    clientName: "",
    clientCompany: "",
    clientAddress: "",
    clientPhone: "",
    clientDesc: "",
  });

  //Products
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);

  const userId = window.sessionStorage.getItem("id");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

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

  const handleSelectAllChange = () => {
    if (products) {
      const allChecked = products.every((item) => item.checked);
      const updatedProducts = products.map((item) => ({
        ...item,
        checked: !allChecked,
      }));
      setProducts(updatedProducts);
    }
  };

  const handleItemChange = (itemId) => {
    if (products) {
      const updatedProducts = products.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );
      setProducts(updatedProducts);
    }
  };

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Callback function to update rate in the productList
  const handleRateChange = (index, newValue) => {
    const updatedProductList = [...products];
    updatedProductList[index].prate = newValue;
    setProducts(updatedProductList);
  };

  // Callback function to update quantity in the productList
  const handleQtyChange = (index, newValue) => {
    const updatedProductList = [...products];
    updatedProductList[index].pqty = newValue;
    setProducts(updatedProductList);
  };

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
              <div className="col-sm-12 col-xl-12">
                <div className="bg-white rounded h-100 p-4">
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">Add Invoice Details</h6>
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
                      <div className="col-md-12">
                        <div className="row  d-flex justify-content-end mb-12">
                          <label
                            htmlFor="inputEmail3"
                            className="col-md-3 col-form-label"
                          >
                            Date of Issue
                          </label>
                          <div className="col-md-3">
                            <input
                              type="date"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              value={formData.issueDate}
                              onChange={(event) =>
                                setFormData({
                                  ...formData,
                                  issueDate: event.target.value,
                                })
                              }
                              placeholder="Write client name"
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
                            Client Name
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              value={formData.clientName}
                              onChange={(event) =>
                                setFormData({
                                  ...formData,
                                  clientName: event.target.value,
                                })
                              }
                              placeholder="Write client name"
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
                            Company Name
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              value={formData.clientCompany}
                              onChange={(event) =>
                                setFormData({
                                  ...formData,
                                  clientCompany: event.target.value,
                                })
                              }
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
                              value={formData.clientAddress}
                              onChange={(event) =>
                                setFormData({
                                  ...formData,
                                  clientAddress: event.target.value,
                                })
                              }
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
                              value={formData.clientPhone}
                              onChange={(event) =>
                                setFormData({
                                  ...formData,
                                  clientPhone: event.target.value,
                                })
                              }
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
                              value={formData.clientDesc}
                              onChange={(event) =>
                                setFormData({
                                  ...formData,
                                  clientDesc: event.target.value,
                                })
                              }
                              placeholder="Write your statements"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="button"
                        onClick={() => setShowInvoiceModal(true)}
                        className="btn btn-light"
                        value="submit"
                        disabled={
                          !formData.clientName ||
                          !formData.clientCompany ||
                          !formData.clientAddress ||
                          !formData.clientPhone ||
                          !formData.clientDesc || 
                          !products ||
                          !products.some((item) => item.checked)
                        }
                      >
                        Create Invoice
                      </button>
                      <InvoiceView
                        show={showInvoiceModal}
                        onHide={() => setShowInvoiceModal(false)}
                        formData={formData}
                        productList={products}
                        onRateChange={handleRateChange}
                        onQtyChange={handleQtyChange}
                        // onSave={handleSaveQuotation}
                      />
                    </div>
                  </form>
                  <hr></hr>
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">
                        Select Products For Invoice
                      </h6>
                      <form className="d-none d-md-flex ms-4">
                        <input
                          className="form-control border-0"
                          type="search"
                          style={{ backgroundColor: "#e3e4ee" }}
                          placeholder="Search"
                          value={searchTerm}
                          onChange={(event) => {
                            setSearchTerm(event.target.value);
                            console.log("Search term:", event.target.value);
                          }}
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
                              className="form-check-input bg-white"
                              type="checkbox"
                              checked={
                                filteredProductList &&
                                filteredProductList.every(
                                  (item) => item.checked
                                )
                              }
                              onChange={handleSelectAllChange}
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
                        {filteredProductList &&
                        filteredProductList.length > 0 ? (
                          filteredProductList.map((p, index) => (
                            <tr key={p.id}>
                              <td>
                                <input
                                  className="form-check-input bg-white"
                                  type="checkbox"
                                  checked={p.checked}
                                  onChange={() => handleItemChange(p.id)}
                                />
                              </td>
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

export default Invoice;
