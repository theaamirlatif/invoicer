import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "../css/style.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const ViewQuotation = ({ show, onHide, mainId, selectedQuotation }) => {

  //Initialize
  const [admin, setAdmin] = useState(null);
  const [productQ, setProductQ] = useState([]);
  const [quotationDetails, setQuotationDetails] = useState({
    issueDate: "",
    clientName: "",
    clientCompany: "",
    clientAddress: "",
    clientPhone: "",
    clientDesc: "",
  });


  useEffect(() => {
    //fetch admin datails
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/adminDetails/${mainId}`, {
          method: "GET"
        });
  
        if (!response.ok) {
          // console.error("Error fetching admin data:", response.status);
          return;
        }
  
        const data = await response.json();
        setAdmin(data);
      } catch (error) {
        // console.error("Error fetching admin data:", error);
      }
    };
    //fetch quotation list
    if (selectedQuotation) {
      setQuotationDetails({
        issueDate: selectedQuotation.qdate,
        clientName: selectedQuotation.cqname,
        clientCompany: selectedQuotation.cqcname,
        clientAddress: selectedQuotation.cqaddress,
        clientPhone: selectedQuotation.cqphone,
        clientDesc: selectedQuotation.cqdesc,
      });
      setProductQ(selectedQuotation.qproducts);
    }
    
    fetchAdminData();
  }, [mainId, selectedQuotation]);

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
        exportPDFWithMethod();
        }
    };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#000000", fontWeight: "700" }}>
            Quotation View
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
                    <h6>Date: {quotationDetails.issueDate}</h6>
                    <div className="childBot">
                    <div className="toDetails">
                        <h6>To:</h6>
                        <p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {quotationDetails.clientName}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {quotationDetails.clientCompany}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {quotationDetails.clientAddress}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {quotationDetails.clientPhone}
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
                    {quotationDetails.cqdesc}
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
                  {productQ && productQ.length > 0 ? (
                    productQ.map((product, index) => {
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
                          <td>{product.prate}</td>
                          <td>{product.pqty}</td>
                          <td>{amount}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", fontSize: "25px" }}>
                        No products available!
                      </td>
                    </tr>
                  )}
                </tbody>
                </Table>
            </Modal.Body>
            </div>

        </PDFExport>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ borderRadius: "10px" }}
            // onClick={onHide}
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewQuotation;
