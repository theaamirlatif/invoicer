import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "../css/style.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { useDispatch } from "react-redux";
import { addQuotation } from "../../app/misc/QuotationSlice";

const QuotationView = ({
  show,
  onHide,
  formData,
  productList,
  onSave,
  onRateChange,
  onQtyChange,
}) => {
  const dispatch = useDispatch();
  const handleSaveQuotation = async () => {
    const selectedProducts = productList.filter((product) => product.checked);
    const quotationData = {
      ucid: formData.userId,
      cqname: formData.clientName,
      cqaddress: formData.clientCompany,
      cqphone: formData.clientPhone,
      cqdesc: formData.clientDesc,
      qdate: formData.issueDate,
      qproducts: selectedProducts,
    };
  
    try {
      // Dispatch the addQuotation action
      const resultAction = await dispatch(addQuotation(quotationData));

      // Check if the action was fulfilled successfully
      if (addQuotation.fulfilled.match(resultAction)) {
        const data = resultAction.payload;
        console.log("Quotation saved successfully:", data.result);
        onHide(); // Close the modal or perform any other action
      } else {
        throw new Error("Failed to save quotation");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Handle validation errors
        console.error("Validation errors:", error.response.data.errors);
      } else {
        console.error("Error saving quotation:", error.message);
      }
    }

    //pdf download
    // html2canvas(document.querySelector("#quotationCapture")).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png", 1.0);
    //   const pdf = new jsPDF({
    //     orientation: "portrait",
    //     unit: "pt",
    //     format: [612, 792],
    //   });
    //   pdf.internal.scaleFactor = 1;
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //   pdf.save("invoice-001.pdf");
    // });
  };

  var storageURL = 'http://localhost:8000/storage/app/';
  //pdf download
  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);
  const exportPDFWithMethod = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 40,
      fileName: `Report for ${new Date().getFullYear()}`,
    });
  };
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  // Admin details
  const userId = window.sessionStorage.getItem("id");
  const [admin, setAdmin] = useState(null);

  async function getAdminData() {
    try {
      const response = await fetch("http://localhost:8000/api/adminDetails/" + userId); // Updated API endpoint

      if (!response.ok) {
        console.error("Error fetching admin data:", response.status);
        return;
      }

      const data = await response.json();
      console.log("data....", data);
      setAdmin(data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  }

  useEffect(() => {
    getAdminData();
  }, [userId]);

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000000", fontWeight: "700" }}>
            Create Quotation
          </Modal.Title>
        </Modal.Header>
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="KendoReact Team"
        >
          <div id="quotationCapture">
            <Modal.Body>
              <div className="parentHeader">
                <div className="childTop">
                  <div className="logo">
                    {admin ? (
                      <img src={admin.ucimg} alt="logo" />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <div className="name">
                    {admin ? <h4>{admin.ucname}</h4> : <p>Loading...</p>}
                  </div>
                </div>
                <hr></hr>
                <h6>Date: {formData.issueDate}</h6>
                <div className="childBot">
                  <div className="toDetails">
                    <h6>To:</h6>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {formData.clientName}
                    </p>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {formData.clientCompany}
                    </p>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {formData.clientAddress}
                    </p>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {formData.clientPhone}
                    </p>
                  </div>
                  <div className="fromDetails">
                    <h6>From:</h6>
                    {admin ? (
                      <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {admin.ucname}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {admin.ucaddress}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {admin.email}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {admin.ucmob}
                        <br />
                      </p>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
                <h6>Comments:</h6>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {formData.clientDesc}
                </p>
              </div>
              <hr></hr>
              <Table className="mb-0 tableClass" responsive>
                <thead>
                  <tr>
                    <th>
                      <h6>Sr.</h6>
                    </th>
                    <th>
                      <h6>Image</h6>
                    </th>
                    <th>
                      <h6>Product Details</h6>
                    </th>
                    <th>
                      <h6>Rate</h6>
                    </th>
                    <th>
                      <h6>Qty.</h6>
                    </th>
                    <th>
                      <h6>Amount</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productList
                    .filter((product) => product.checked)
                    .map((product, index) => {
                      const rate = parseFloat(product.prate) || 0;
                      const qty = parseFloat(product.pqty) || 0;
                      const amount = rate * qty;

                      return (
                        <tr key={product.id}>
                          <td>{index + 1}</td>
                          <td>
                            <img src={product.pimg} alt="pimg" />
                          </td>
                          <td>
                            {product.pname}
                            <br />
                            {product.pmodel}
                            <br />
                            {product.pdesc}
                          </td>
                          <td
                            contentEditable
                            onBlur={(e) =>
                              onRateChange(
                                index,
                                parseFloat(e.target.innerText) || 0
                              )
                            }
                          >
                            {product.prate}
                          </td>
                          <td
                            contentEditable
                            onBlur={(e) =>
                              onQtyChange(
                                index,
                                parseFloat(e.target.innerText) || 0
                              )
                            }
                          >
                            {product.pqty}
                          </td>
                          <td>{amount}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Modal.Body>
          </div>
        </PDFExport>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ borderRadius: "10px" }}
            onClick={onHide}
          >
            Close
          </Button>
          <Button
            variant="outline-primary"
            style={{ borderRadius: "10px" }}
            onClick={exportPDFWithComponent}
          >
            <i className="fas fa-print" style={{ marginRight: "10px" }}></i>
            Download
          </Button>
          <Button
            variant="outline-primary"
            style={{ borderRadius: "10px" }}
            onClick={handleSaveQuotation}
          >
            <i
              className="fas fa-cloud-download-alt"
              style={{ marginRight: "10px" }}
            ></i>
            Save Copy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuotationView;
