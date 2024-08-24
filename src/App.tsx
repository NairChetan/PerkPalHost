import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin_Dashboard from "./Pages/Admin_Dashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import LogIn_Page from "./Pages/LogIn_Page";
import Clockin from "./Pages/Clockin";
import PendingApproval from "./Pages/PendingApproval";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./auth/auth-config";


function App() {



  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleLoginRedirect = () => {
      instance
          .loginRedirect({
              ...loginRequest,
              prompt: 'create',
          })
          .catch((error: any) => console.log(error));
  };
  const handleLogoutRedirect = () => {
    instance
        .logoutRedirect({
            postLogoutRedirectUri:'/',
        })
        window.location.reload();
};
  return (

      <div className="card">
          <AuthenticatedTemplate>
              {activeAccount ? (
                  <>
                  {/* <SendSecretKeyToBackend/> */}
                  {/* <button onClick={handleLogoutRedirect}>Logout</button><p>You are signed in!</p> */}
                  <Admin_Dashboard />
                  </>
              ) : null}
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
              {/* <LogIn_Page></LogIn_Page> */}
              <LogIn_Page/>
              <button onClick={handleLoginRedirect}>Login</button>
              <p>Please in!</p>
              
          </UnauthenticatedTemplate>
      </div>
  );    
}

const AppRoutes: React.FC = () => (

  <Router>
    <Routes>
      <Route path="/" element={<LogIn_Page/>} />
      <Route path="/admin-dashboard" element={<Admin_Dashboard />} />
      <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      <Route path="/clockin" element={<Clockin />} />
      <Route path="/pending-approval" element={<PendingApproval />} />
    </Routes>
  </Router>
);

export default App;
