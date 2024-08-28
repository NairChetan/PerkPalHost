import React, { useState ,useEffect} from "react";
import dayjs from 'dayjs'; 
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";
import Calendar from "../Components/Clockin/Calendar/Calendar";
import UserLogin from "../Components/Clockin/UserLogin/UserLogin";
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
      <UserLogin selectedDate={selectedDate} setSelectedDate={""} />
        <Calendar setSelectedDate={setSelectedDate} />  
      </div>
      <Footer />
    </>
  );
};

export default Clockin;
