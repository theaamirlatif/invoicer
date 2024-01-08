import React from "react";

const Spinner = () => {
  return (
    <>
      <div
        id="spinner"
        className="show position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-body"
          style={{ width: "3rem", height: "3rem", role: "status" }}
        >
          <span className="sr-only">Loading...</span><img style={{ width: "2.5rem", height: "2.5rem", role: "status" }} src="/img/favicon-96x96.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Spinner;
