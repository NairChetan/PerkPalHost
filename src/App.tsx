import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Admin_Dashboard from "./Pages/Admin_Dashboard";
// import EmployeeDashboard from "./Pages/EmployeeDashboard";
// import LogIn_Page from "./Pages/LogIn_Page";
// import Clockin from "./Pages/Clockin";
// import PendingApproval from "./Pages/PendingApproval";
import Admin_Category from "./Pages/Admin_Category";

const AppRoutes: React.FC = () => (
  // <Router>
  //   <Routes>
  //     <Route path="/" element={<LogIn_Page />} />
  //     <Route path="/admin-dashboard" element={<Admin_Dashboard />} />
  //     <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
  //     <Route path="/clockin" element={<Clockin />} />
  //     <Route path="/pending-approval" element={<PendingApproval />} />
  //   </Routes>
  // </Router>
  <Admin_Category/>
);

export default AppRoutes;
