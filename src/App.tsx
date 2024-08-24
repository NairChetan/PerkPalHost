import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useMsal } from "@azure/msal-react";

import AppRoutes from "./auth/AppRoutes";

function App() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  return (
    <>
      <AppRoutes />
    </>
  );
}

// const AppRoutes: React.FC = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<LogIn_Page />} />
//       <Route path="/admin-dashboard" element={<Admin_Dashboard />} />
//       <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
//       <Route path="/clockin" element={<Clockin />} />
//       <Route path="/pending-approval" element={<PendingApproval />} />
//     </Routes>
//   </Router>
// );

export default App;
