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
import Admin_Category from "../Pages/Admin_Category";

const AppRoutes: React.FC = () => {
  const { instance } = useMsal();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state
  const activeAccount = instance.getActiveAccount();
  
  useEffect(() => {
    const storedRole = localStorage.getItem("Role");

    if (storedRole) {
      setRole(storedRole.toLowerCase());
      setLoading(false);
    } else if (activeAccount) {
      const fetchRole = async () => {
        try {
          // Call the API endpoint for authentication
          const response = await axios.post(
            "http://localhost:8080/api/v1/auth/login",
            {
              email: activeAccount.username, // Pass email in request body for POST
            }
          );

          // Destructure the data according to the response format
          const {
            accessToken,
            clubName,
            duName,
            employeeId,
            firstName,
            lastName,
            photoUrl,
            roleName
          } = response.data;

          // Set role in state
          setRole(roleName.toLowerCase());

          // Store employee details directly in localStorage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("employeeId", employeeId.toString());
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("duName", duName);
          localStorage.setItem("photoUrl", photoUrl);
          localStorage.setItem("clubName", clubName);
          localStorage.setItem("Role", roleName);
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
                <Route path="/category-edit" element={<Admin_Category />} />
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