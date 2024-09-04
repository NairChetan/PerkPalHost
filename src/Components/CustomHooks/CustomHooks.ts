import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:8080";
// const token = localStorage.getItem("accessToken");
// console.log(token);
// const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmphbGkuZGFzQHNyZWVnY2xvdWRnbWFpbC5vbm1pY3Jvc29mdC5jb20iLCJpYXQiOjE3MjU0NzQ1OTYsImV4cCI6MTcyNjA3OTM5NX0.3QV_4bB9yASi3HcHLBhwk4qECJ3hb0VErQzB6KPvznK82IhKG2U0H6813WO6D_BfqxvCfbLa6PmPxUZLDiLcQg";
export type PointData = {
  totalPoints: number;
  redeemablePoints: number;
};

export type categoryNameFetch = {
  categoryName: string;
};

export type ActivityFiltered = {
  id: number;
  activityName: string;
  categoryName: string;
};

export type participationDataForPendingApproval = {
  employeeFirstName: string;
  employeeLastName: string;
  employeeId: string;
  activityName: string;
  duration: number;
  description: string;
};

export const useFetchPoints = (endUrl: string, refresh: number) => {
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
  }, [endUrl, refresh]);

  return { points, loading, error };
};

interface Category {
  id: number;
  categoryName: string;
}

export const useFetchCategories = (endUrl: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
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
};

export const useFetchActivities = (categoryName: string) => {
  const [activities, setActivities] = useState<ActivityFiltered[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoryName) return;
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/api/v1/activity/category/${categoryName}`
        );
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

// export const useSubmitParticipation = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const submitParticipation = async (participationData :string) => {
//     try {
//       setLoading(true);
//       await axios.post(`${baseURL}/api/v1/participation/participationpost`, participationData);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { submitParticipation, loading, error };
// };

export const useSubmitParticipation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitParticipation = async (participationData: object) => {
    try {
      const token = localStorage.getItem("accessToken");
      setLoading(true);
      await axios.post(
        `${baseURL}/api/v1/participation/participationpost`,
        participationData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { submitParticipation, loading, error };
};

export const useFetchParticipation = (url: string, refreshPage: number) => {
  const [participation, setParticipation] = useState<any[]>([]);
  const [pagination, setPagination] = useState<{
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
  } | null>(null);
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
          number: response.data.data.number,
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
  }, [url, refreshPage]);

  return { participation, pagination, loading, error };
};
export const usePostApprovalStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postApprovalStatus = async (
    id: number,
    status: string,
    remarks: string | null,
    approvalDate: string
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      console.log(token);
      const response = await axios.put(
        `${baseURL}/api/v1/participation/approval-status-remark/${id}`,
        {
          approvalStatus: status,
          remarks: remarks,
          approvalDate: approvalDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else {
        console.error("Error message:", err.message);
      }
      setError("Failed to post approval status.");
      setLoading(false);
      throw err;
    }
  };

  return { postApprovalStatus, loading, error };
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
        const response = await axios.get(
          `${baseURL}/api/v1/participation/date?employeeId=${employeeId}`
        );
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

export const useFetchUserLoginsByDate = (
  selectedDate: string,
  employeeId: string
) => {
  const [userLogins, setUserLogins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!selectedDate || !employeeId) return;

    const fetchUserLogins = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${baseURL}/api/v1/participation/date/${selectedDate}?employeeId=${employeeId}`
        );
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

export const useEditParticipationEntry = (id: number) => {
  const [entry, setEntry] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${baseURL}/api/v1/participation/userLog/${id}`
        );
        setEntry(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const updateEntry = async (updatedData: {
    description: string;
    duration: number;
    proofUrl: string | null;
  }) => {
    try {
      const token = localStorage.getItem("accessToken");
      setLoading(true);
      await axios.put(
        `${baseURL}/api/v1/participation/userLog/${id}`,
        updatedData
        ,
        {
          headers: {
            'Authorization': `Bearer ${token}` // Attach the token here
          }
        }
      );
      setLoading(false);
      return true; // Return true if update is successful
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      return false; // Return false if update fails
    }
  };

  return { entry, updateEntry, loading, error };
};

export const useDeleteParticipation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteParticipation = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/api/v1/participation/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}` // Attach the token here
        }
      }
      );
      setLoading(false);
      return true; // Return true if deletion is successful
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else {
        console.error("Error message:", err.message);
      }
      setError("Failed to delete participation entry.");
      setLoading(false);
      return false; // Return false if deletion fails
    }
  };

  return { deleteParticipation, loading, error };
};

export const useFetchActivitiesForAdmin = () => {
  const [activities, setActivities] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/v1/activity`);
        setActivities(response.data.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.error("Error response data:", err.response.data);
          console.error("Error response status:", err.response.status);
          console.error("Error response headers:", err.response.headers);
        } else {
          console.error("Error message:", err.message);
        }
        setError("Failed to fetch activities.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return { activities, loading, error };
};

export const useDeleteActivity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteActivity = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`${baseURL}/api/v1/activity/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}` // Attach the token here
        }
      }
      );
      setLoading(false);
      return true; // Return true if deletion is successful
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else {
        console.error("Error message:", err.message);
      }
      setError("Failed to delete activity.");
      setLoading(false);
      return false; // Return false if deletion fails
    }
  };

  return { deleteActivity, loading, error };
};

export const useAddNewActivityForAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addNewActivity = async (activityData: {
    activityName: string;
    categoryId: number;
    description: string;
    createdBy: number;
    weightagePerHour: number;
  }) => {
    try {
      const token = localStorage.getItem("accessToken");
      setLoading(true);
      await axios.post(`${baseURL}/api/v1/activity`, activityData,
      {
        headers: {
          'Authorization': `Bearer ${token}` // Attach the token here
        }
      }
      );
      setSuccess(true); // Set success state to true if the activity was added successfully
      setLoading(false);
      return true; // Return true if the addition is successful
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else {
        console.error("Error message:", err.message);
      }
      setError("Failed to add new activity.");
      setLoading(false);
      setSuccess(false); // Set success state to false if there was an error
      return false; // Return false if the addition fails
    }
  };

  return { addNewActivity, loading, error, success };
};

export const useUpdateActivityForAdmin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const updateActivity = async (
    id: number,
    updatedActivityData: {
      description: string;
      updatedBy: number;
      weightagePerHour: number;
    }
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      setLoading(true);
      await axios.put(`${baseURL}/api/v1/activity/${id}`, updatedActivityData,
      {
        headers: {
          'Authorization': `Bearer ${token}` // Attach the token here
        }
      }
      );
      setSuccess(true); // Set success state to true if the update was successful
      setLoading(false);
      return true; // Return true if the update is successful
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      } else {
        console.error("Error message:", err.message);
      }
      setError("Failed to update activity.");
      setLoading(false);
      setSuccess(false); // Set success state to false if there was an error
      return false; // Return false if the update fails
    }
  };

  return { updateActivity, loading, error, success };
};
