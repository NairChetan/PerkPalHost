// import { useState, useEffect } from 'react';
// import axios from 'axios';
// // import { Employee } from '../types/Employee';

// interface UseFetchEmployees {
//   data: Employee[];
//   loading: boolean;
//   error: string | null;
// }

// const useFetchEmployees = (): UseFetchEmployees => {
//   const [data, setData] = useState<Employee[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     axios.get<Employee[]>('http://localhost:8080/api/v1/employee')
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   return { data, loading, error };
// };

// export default useFetchEmployees;