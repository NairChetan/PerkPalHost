import axios from "axios";
import { useState, useEffect } from "react";
 
const baseURL = "http://localhost:8080";
 
export type PointData = {
  totalPoints: number;
  redeemablePoints: number;
};

export type categoryNameFetch ={
  categoryName : string;
};

export type ActivityFiltered={
    id: number,
    activityName: string,
    categoryName: string

}
 
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
      } finally {
        setLoading(false);
      }
    };
  
    return { submitParticipation, loading, error };
  };
  