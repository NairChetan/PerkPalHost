import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmployeeDashboard from "../Pages/EmployeeDashboard";
import Clockin from "../Pages/Clockin";
import Admin_Dashboard from "../Pages/Admin_Dashboard";
import PendingApproval from "../Pages/PendingApproval";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import LogIn_Page from "../Pages/LogIn_Page";
import { loginRequest } from "../auth/auth-config";

const AppRoutes: React.FC = () => {
  const { instance } = useMsal();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const activeAccount = instance.getActiveAccount();
  console.log(activeAccount);

  const handleLoginRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    if (activeAccount) {
      const fetchRole = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/v1/employee/role",
            {
              params: { email: activeAccount.username }, // Pass email as query parameter
            }
          );

          // Destructure the data according to the response format
          const { id, roleName } = response.data.data;

          setRole(roleName.toLowerCase()); // Ensure role is lowercase for consistency

          // Store employee ID directly in localStorage
          localStorage.setItem("employeeId", id.toString());
        } catch (error) {
          console.error("Error fetching role:", error);
        } finally {
          setLoading(false); // Set loading to false once role is fetched
        }
      };

      fetchRole();
    } else {
      setLoading(false); // If no active account, stop loading
    }
  }, [activeAccount]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while role is being fetched
  }

  return (
    <Router>
      <AuthenticatedTemplate>
        {role ? (
          <Routes>
            {role === "admin" && (
              <>
                <Route path="/admin-dashboard" element={<Admin_Dashboard />} />
                <Route path="/pending-approval" element={<PendingApproval />} />
                <Route path="*" element={<Navigate to="/admin-dashboard" />} />
              </>
            )}

            {role === "employee" && (
              <>
                <Route
                  path="/employee-dashboard"
                  element={<EmployeeDashboard />}
                />
                <Route path="/clockin" element={<Clockin />} />
                <Route
                  path="*"
                  element={<Navigate to="/employee-dashboard" />}
                />
              </>
            )}
          </Routes>
        ) : (
          <div>No role found. Please contact support.</div>
        )}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LogIn_Page />
      </UnauthenticatedTemplate>
    </Router>
  );
};

export default AppRoutes;
