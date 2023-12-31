import React from "react";

const Footer = () => {
  return (
    <>
      {/* <!-- Footer Start --> */}
      <div className="container-fluid pt-4 px-4">
        <div className="bg-white rounded-top p-4">
          <div className="row">
            <div className="col-12 col-sm-6 text-center text-sm-start">
              &copy; <a href="/#" className="text-dark fw-bold">Invoicer</a>, All Right Reserved.
            </div>
            <div className="col-12 col-sm-6 text-center text-sm-end">
              {/* <!--/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. ***/}
              Designed By <a href="/#" className="text-dark fw-bold">Aamir Latif</a>
              <br />
              Distributed By:{" "}
              <a href="/#" className="text-dark fw-bold" target="_blank">
                SIP Operations
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
    </>
  );
};

export default Footer;
