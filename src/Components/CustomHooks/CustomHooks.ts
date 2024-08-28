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
 
export type participationDataForPendingApproval = {
  employeeFirstName: string;
  employeeLastName: string;
  employeeId: string;
  activityName: string;
  duration: number;
  description: string;
};

export const useFetchPoints = (endUrl: string,refresh:number) => {
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
  }, [endUrl,refresh]);
 
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
  
  export const useFetchParticipation = (url: string) => {
    const [participation, setParticipation] = useState<any[]>([]);
    const [pagination, setPagination] = useState<{ totalPages: number; totalElements: number; size: number; number: number } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseURL}${url}`);
          console.log(response);
          setParticipation(response.data.data.content);
          setPagination({
            totalPages: response.data.data.totalPages,
            totalElements: response.data.data.totalElements,
            size: response.data.data.size,
            number: response.data.data.number
          });
          setLoading(false);
        } catch (err) {
          if (axios.isAxiosError(err) && err.response) {
            // Log detailed error information
            console.error("Error response data:", err.response.data);
            console.error("Error response status:", err.response.status);
            console.error("Error response headers:", err.response.headers);
          } else {
            // Log the error message
            console.error("Error message:", err.message);
          }
          setError("Failed to fetch data.");
          setLoading(false);
        }
      };
   
      fetchData();
    }, [url]);
   
    return { participation, pagination, loading, error };
  };

  
  export const useFetchUserLoginsByEmployee = (employeeId: string) => {
    const [userLogins, setUserLogins] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      if (!employeeId) return;
  
      const fetchUserLogins = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${baseURL}/api/v1/participation/date?employeeId=${employeeId}`);
          setUserLogins(response.data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserLogins();
    }, [employeeId]);
  
    return { userLogins, loading, error };
  };
  

 
export const useFetchUserLoginsByDate = (selectedDate: string, employeeId: string) => {
    const [userLogins, setUserLogins] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!selectedDate || !employeeId) return;

        const fetchUserLogins = async () => {
            try {
                setLoading(true);
               
                const response = await axios.get(`${baseURL}/api/v1/participation/date/${selectedDate}?employeeId=${employeeId}`);
                setUserLogins(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserLogins();
    }, [selectedDate, employeeId]);

    return { userLogins, loading, error };
};
