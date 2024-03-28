import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Application from "./Application";
import Login from "./login";
import Register from "./register";


function App() {
  const [customer_detail,add_customer_detail]=useState([{email:"check",password:"check"}])
  const customer_detail_collector=(customer_data)=>{
    add_customer_detail([customer_data,...customer_detail])
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register collect_detail={customer_detail_collector}/>}/>
        <Route path="/login" element={<Login apidata_customer={customer_detail}/>}/>
        <Route path="/application" element={<Application/>}/>
      </Routes>
      </BrowserRouter>
      
      
      
      
      
      
    </div>
  );
}

export default App;
