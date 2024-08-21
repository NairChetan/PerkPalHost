import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLogin from "../Components/Clockin/UserLogin/UserLogin";
import NewEntry from "../Components/NewEntry/NewEntry";
import Calendar from "../Components/Clockin/Calendar/Calendar";
import dayjs from "dayjs";
import styles from "../Components/Clockin/Clockin.module.css";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

const Clockin: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  // Q : look into axios interceptors
  // https://axios-http.com/docs/interceptors
  //  API calls can be moved to different files
  // api helper functions can be added to reduce code duplications
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  /*

  this can be written as 
    useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

      useEffect(() => {

    fetchEntries();
  }, []);

      const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

  */

  const addEntry = async (entry: any) => {
    try {
      const response = await axios.post("http://localhost:3000/entries", entry);
      setEntries([...entries, response.data]);
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.clockinContainer}>
        <UserLogin entries={entries} selectedDate={selectedDate} />
        {/* <NewEntry addEntry={addEntry} /> */}
        <Calendar entries={entries} setSelectedDate={setSelectedDate} />
      </div>
      <Footer />
    </>
  );
};

export default Clockin;
