import React, { useState ,useEffect} from "react";
import dayjs from 'dayjs'; 
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import Calendar from "../Components/Clockin/Calendar/Calendar";
import UserLogin from "../Components/Clockin/UserLog/UserLog";
import styles from "../Components/Clockin/Clockin.module.css";

const Clockin: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  useEffect(() => {
    console.log("Selected Date in Clockin Component:", selectedDate);
  }, [selectedDate]);

  return (
    <>
      <Navbar />
      <div className={styles.clockinContainer}>
      <Calendar setSelectedDate={setSelectedDate} />  
      <UserLogin selectedDate={selectedDate}  />
        
      </div>
      <Footer />
    </>
  );
};

export default Clockin;
