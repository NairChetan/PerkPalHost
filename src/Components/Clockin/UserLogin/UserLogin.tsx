import React from 'react';
import styles from './UserLogin.module.css';
import dayjs from 'dayjs';
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Entry {
  activity: string;
  category: string;
  description: string;
  duration: string;
  remarks: string;
  status: string;
  proof?: string;
  date: string;  // Ensure date is included in the entry
}

interface UserLoginProps {
  entries: Entry[];
  selectedDate: string;
}

const UserLogin: React.FC<UserLoginProps> = ({ entries, selectedDate }) => {
  const filteredEntries = selectedDate
  ? entries.filter(entry => dayjs(entry.date).format('YYYY-MM-DD') === selectedDate)
  : entries;
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
            <th>Duration (Hrs)</th>
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
              <td>{entry.category}</td>
              <td>{entry.activity}</td>
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
