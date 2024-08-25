import axios from "axios";
import { useState, useEffect } from "react";
<<<<<<< HEAD
 
const baseURL = "http://localhost:8080";
 
=======

const baseURL = "http://localhost:8080";

>>>>>>> 2dcb3154d346ba0ea2af2d02565d67d053cecdaf
export type PointData = {
  totalPoints: number;
  redeemablePoints: number;
};
<<<<<<< HEAD

export type categoryNameFetch ={
  categoryName : string;
};

export type ActivityFiltered={
    id: number,
    activityName: string,
    categoryName: string

}
 
=======
export type participationDataForPendingApproval = {
  employeeFirstName: string;
  employeeLastName: string;
  employeeId: string;
  activityName: string;
  duration: number;
  description: string;
};

>>>>>>> 2dcb3154d346ba0ea2af2d02565d67d053cecdaf
export const useFetchPoints = (endUrl: string) => {
  const [points, setPoints] = useState<PointData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
<<<<<<< HEAD
 
=======

>>>>>>> 2dcb3154d346ba0ea2af2d02565d67d053cecdaf
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
<<<<<<< HEAD
 
    fetchPoints();
  }, [endUrl]);
 
  return { points, loading, error };
};



export const useFetchCategories = (endUrl: string) => {
    const [categories, setCategories] = useState<categoryNameFetch| null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${baseURL}${endUrl}`);
          setCategories(response.data.data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCategories();
    }, [endUrl]);
  
    return { categories, loading, error };
}


export const useFetchActivities = (categoryName: string) => {
    const [activities, setActivities] = useState<ActivityFiltered[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!categoryName) return;
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseURL}/api/v1/activity/category/${categoryName}`);
                setActivities(response.data.data); // Ensure this matches the response structure
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [categoryName]);

    return { activities, loading, error };
};

  export const useSubmitParticipation = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const submitParticipation = async (participationData :string) => {
      try {
        setLoading(true);
        await axios.post(`${baseURL}/api/v1/participation/participationpost`, participationData);
      } catch (err) {
        setError(err);
=======

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
>>>>>>> 2dcb3154d346ba0ea2af2d02565d67d053cecdaf
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
  
    return { submitParticipation, loading, error };
  };
  
=======
    fetchParticipation();
  }, [endUrl]);
  return { participation, loading, error };
};
>>>>>>> 2dcb3154d346ba0ea2af2d02565d67d053cecdaf
