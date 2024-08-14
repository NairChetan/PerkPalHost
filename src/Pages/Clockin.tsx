import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserLogin from '../Components/Clockin/UserLogin/UserLogin';
import NewEntry from '../Components/NewEntry/NewEntry';
import Calendar from '../Components/Clockin/Calendar/Calendar';
import dayjs from 'dayjs';
import styles from './Clockin.module.css';
import Navbar from '../Components/NavBar/Navbar';
import Footer from '../Components/Footer/Footer';

const Clockin: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/entries');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const addEntry = async (entry: any) => {
    try {
      const response = await axios.post('http://localhost:3000/entries', entry);
      setEntries([...entries, response.data]);
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <div className={styles.clockinContainer}>
      <Navbar/>
      <UserLogin entries={entries} selectedDate={selectedDate} />
      <Calendar entries={entries} setSelectedDate={setSelectedDate} />
      <Footer/>
    </div>
  );
};

export default Clockin;
