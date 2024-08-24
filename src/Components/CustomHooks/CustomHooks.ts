import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:8080";

export type PointData = {
  totalPoints: number;
  redeemablePoints: number;
};
export type participationDataForPendingApproval = {
  employeeFirstName: string;
  employeeLastName: string;
  employeeId: string;
  activityName: string;
  duration: number;
  description: string;
};

export const useFetchPoints = (endUrl: string) => {
  const [points, setPoints] = useState<PointData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}${endUrl}`);
        const data: PointData = response.data.data; // Adjust based on actual response structure
        setPoints(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [endUrl]);

  return { points, loading, error };
};
export const useFetchParticipation = (endUrl: string) => {
  const [participation, setParticipation] = useState<
    participationDataForPendingApproval[] | null
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const fetchParticipation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}${endUrl}`);
        const data: participationDataForPendingApproval[] = response.data.data;
        setParticipation(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchParticipation();
  }, [endUrl]);
  return { participation, loading, error };
};
