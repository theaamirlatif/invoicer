import { useState, useEffect } from "react";
import Footer from "./inc/Footer";
import Navbar from "./inc/Navbar";
import Sidebar from "./inc/Sidebar";
import { useNavigate, Link, NavLink } from "react-router-dom";
import Spinner from "./inc/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, productList } from "../app/misc/ProductSlice";

const Product = () => {
  const navigate = useNavigate();

  const [id, setId] = useState(null);
  const [pimg, setPimg] = useState("");
  const [pname, setPname] = useState("");
  const [pmodel, setPmodel] = useState("");
  const [pcat, setPcat] = useState("");
  const [prate, setPrate] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [btnText, setBtnText] = useState("Add Product");
  const [products, setProducts] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);

  const userId = window.sessionStorage.getItem("id");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPimg(file);
  };

  const saveProduct = () => {
    const formData = new FormData();
    formData.append("ucid", userId);
    formData.append("pname", pname);
    formData.append("pmodel", pmodel);
    formData.append("pcat", pcat);
    formData.append("prate", prate);
    formData.append("pimg", pimg);
    formData.append("pdesc", pdesc);

    dispatch(addProduct(formData)).then((result) => {
      if (result.error) {
        setAlertMessage(result.error);
      } else {
        setAlertMessage("Product successfully Added!");
        setPname("");
        setPmodel("");
        setPcat("");
        setPrate("");
        setPimg("");
        setPdesc("");
      }
    });

    dispatch(addProduct(userId));
  };

  useEffect(() => {
    dispatch(productList(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("Component is mounted");
    console.log("User ID:", userId);

    dispatch(productList(userId)).then((result) => {
      console.log("Product list fetched successfully");
      if (result.payload && result.payload.products) {
        // Update the component state with the fetched products
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

  const populateEditForm = (productId) => {
    const productToEdit = products.find(product => product.id === productId);

    if (productToEdit) {
      setId(productToEdit.id);
      setPimg(productToEdit.pimg);
      setPname(productToEdit.pname);
      setPmodel(productToEdit.pmodel);
      setPcat(productToEdit.pcat);
      setPrate(productToEdit.prate);
      setPdesc(productToEdit.pdesc);
      setBtnText("Update Product");
    }
  };

  // async function delProduct(id) {
  //   let delRes = await fetch(window.api + "delProduct/" + id);
  //   delRes = await delRes.json();
  //   // setProductList([]);
  //   setPcat("");
  // }

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
                <div className=" bg-white rounded h-100 p-4">
                  <div className="row" style={{ marginBottom: "-15px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">Add Product Details</h6>
                      <NavLink to="/AllProducts" className="text-dark">
                        See All
                      </NavLink>
                    </div>
                    {alertMessage && (
                      <div className="alert alert-danger" role="alert">
                        {alertMessage}
                      </div>
                    )}
                  </div>
                  <form encType="multipart/form-data">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row mb-12">
                          <label
                            htmlFor="inputEmail3"
                            className="col-sm-12 col-form-label"
                          >
                            Enter Name
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              value={pname}
                              onChange={(e) => setPname(e.target.value)}
                              placeholder="Write product name"
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
                            Enter Model
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              value={pmodel}
                              onChange={(e) => setPmodel(e.target.value)}
                              required
                              placeholder="Write product model"
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
                            Enter Category
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              value={pcat}
                              onChange={(e) => setPcat(e.target.value)}
                              placeholder="Write category"
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
                            Select Image
                          </label>
                          <div className="col-md-12">
                            <input
                              type="file"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              onChange={handleImageChange}
                              placeholder="Select image..."
                              required
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
                            Enter Price
                          </label>
                          <div className="col-md-12">
                            <input
                              type="number"
                              className="form-control text-dark border"
                              style={{ backgroundColor: "#e3e4ee" }}
                              required
                              value={prate}
                              onChange={(e) => setPrate(e.target.value)}
                              placeholder="Write product price"
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
                              onChange={(e) => setPdesc(e.target.value)}
                              required
                              value={pdesc}
                              placeholder="Write description"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        type="button"
                        onClick={saveProduct}
                        className="btn btn-light"
                        disabled={
                          !pname ||
                          !pmodel ||
                          !pcat ||
                          !prate ||
                          !pimg ||
                          !pdesc
                        }
                      >
                        {loading ? "Saving..." : btnText}
                      </button>
                    </div>
                  </form>
                  <hr></hr>
                  <div className="row" style={{ marginBottom: "-10px" }}>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h6 className="mb-0 text-dark">All Products</h6>
                      <form className="d-none d-md-flex ms-4">
                        <input
                          className="form-control text-dark border border-0"
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
                    <table className="table text-start align-middle table-bordered table-hover mb-0 text-dark">
                      <thead>
                        <tr className="text-dark">
                          <th scope="col">Sr.</th>
                          <th scope="col">Model</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Product Category</th>
                          <th scope="col">Product Price</th>
                          <th scope="col">Actions</th>
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
                              <td style={{ display: "flex" }}>
                                {/* <a
                                      href="/#"
                                      className="btn btn-outline-info"
                                    >
                                      <i className="fa fa-eye"></i>
                                    </a> */}
                                <Link
                                  onClick={() =>
                                    populateEditForm(
                                      p.id,
                                      p.pname,
                                      p.pmodel,
                                      p.pcat,
                                      p.prate,
                                      p.pdesc
                                    )
                                  }
                                  className="btn btn-outline-success"
                                  style={{
                                    marginRight: "10px",
                                  }}
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>
                                <Link
                                  // onClick={() => delProduct(p.id)}
                                  className="btn btn-outline-danger"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
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

export default Product;
