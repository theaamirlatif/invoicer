import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "../css/style.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const InvoiceView = ({
  show,
  onHide,
  formData,
  productList,
  onSave,
  onRateChange,
  onQtyChange,
}) => {
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const calculateSubTotalAndTotal = () => {
    let subTotalValue = 0;

    productList
      .filter((product) => product.checked)
      .forEach((product, index) => {
        const rate = parseFloat(product.prate) || 0;
        const qty = parseFloat(product.pqty) || 0;
        const amount = rate * qty;

        onRateChange(index, rate);
        onQtyChange(index, qty);

        subTotalValue += amount;
      });

    setSubTotal(subTotalValue.toFixed(2));
    setTotal(subTotalValue.toFixed(2));
  };

  useEffect(() => {
    calculateSubTotalAndTotal();
  }, [productList]);

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
      const response = await fetch("https://invoicers.000webhostapp.com/api/adminDetails/" + userId); // Updated API endpoint

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
            Create Invoice
          </Modal.Title>
        </Modal.Header>
        <PDFExport
          ref={pdfExportComponent}
          paperSize="auto"
          margin={40}
          fileName={`Report for ${new Date().getFullYear()}`}
          author="KendoReact Team"
        >
          <div id="invoiceCapture">
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
              <Table className="tableClass">
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ width: "130px" }}>
                      <h6>SUBTOTAL</h6>
                    </td>
                    <td style={{ width: "130px" }}>{subTotal}</td>
                  </tr>
                  <tr style={{ display: "none" }}>
                    <td></td>
                    <td style={{ width: "130px" }}>
                      <h6>TAX</h6>
                    </td>
                    <td style={{ width: "130px" }}>79658858</td>
                  </tr>
                  <tr style={{ display: "none" }}>
                    <td></td>
                    <td style={{ width: "130px" }}>
                      <h6>DISCOUNT</h6>
                    </td>
                    <td style={{ width: "130px" }}>585</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style={{ width: "130px" }}>
                      <h6>TOTAL</h6>
                    </td>
                    <td style={{ width: "130px" }}>{total}</td>
                  </tr>
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
            variant="outline-primary d-none"
            style={{ borderRadius: "10px" }}
            // onClick={handleSaveQuotation}
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

export default InvoiceView;
