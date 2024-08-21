import axios from "axios";
import { useState, useEffect, useCallback } from "react";
const baseURL = "http://localhost:5000/";
type EmployeeData = {
    emp_id: number;
    // Add other fields here if necessary
  };
export const useFetchPendingApproval = (endURL: string) => {
  const [employeeNameList, setEmployeeList] = useState<string[]>([]);
  const [participantList, setParticipantList] = useState<number[]>([]);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Q : why useCallback is added here?
  const fetchPendingApproval = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}${endURL}`,
      );
      const data = response.data;
      const empid = data.map((data:EmployeeData)=>data.emp_id);
      setEmployeeList(empid);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  });
  useEffect(() => {
    fetchPendingApproval();
  }, [endURL,fetchPendingApproval]);
  return { employeeNameList, participantList, error, loading };
};
