import React from 'react';
import {useEffect} from 'react';
import styles from './UserLogin.module.css';
import dayjs from 'dayjs';
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFetchUserLoginsByDate } from '../../CustomHooks/CustomHooks';

interface UserLoginProps {
  selectedDate: string;
  setSelectedDate : string;
}

const UserLogin: React.FC<UserLoginProps> = ({ selectedDate }) => {
  useEffect(() => {
    console.log("UserLogin component re-rendered with selectedDate:", selectedDate);
  }, [selectedDate]);
  const { userLogins } = useFetchUserLoginsByDate(selectedDate,localStorage.getItem("employeeId") || "");

  const filteredEntries = userLogins.filter(entry => dayjs(entry.participationDate).format('YYYY-MM-DD') === selectedDate);

  return (
    <>
    
      <h3 className={styles.Log}>User Log Entry</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Activity</th>
              <th>Description</th>
              <th>Duration (Min)</th>
              <th>Remarks</th>
              <th>Status</th>
              <th>Proof</th>
              <th>Save/Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.activityIdCategoryName}</td>
                <td>{entry.activityName}</td>
                <td>{entry.description}</td>
                <td>{entry.duration}</td>
                <td>{entry.remarks}</td>
                <td>{entry.status}</td>
                <td>{entry.proof}</td>
                <td><button><AiOutlineEdit /></button></td>
                <td><button><RiDeleteBin6Line /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserLogin;
