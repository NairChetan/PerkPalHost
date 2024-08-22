import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:8080";

type PointData = {
  totalPoints: number;
  redeemablePoints: number;
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
