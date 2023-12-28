import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Error from "./components/404Error";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import AllInvoices from "./components/AllInvoices";
import Test from "./components/Test";
import Invoice from "./components/Invoice";
import AllQuotations from "./components/AllQuotations";
import Quotation from "./components/Quotation";
import Product from "./components/Product";
import AllProducts from "./components/AllProducts";
import SignUp from "./components/SignUp"; 
import Settings from "./components/Settings";
import Logout from "./components/Logout";
import Customer from "./components/Customer";

function App () {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Quotation" element={<Quotation />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Invoice" element={<Invoice />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/AllQuotations" element={<AllQuotations />} />
        <Route path="/AllInvoices" element={<AllInvoices />} />
        <Route path="/AllProducts" element={<AllProducts />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Error" element={<Error />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      
    </div>
  );
};

export default App;
