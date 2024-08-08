import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';
import { FaCalendarAlt } from "react-icons/fa";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import zIndex from '@mui/material/styles/zIndex';

interface CalendarProps {
  entries: any[];
  setSelectedDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ entries, setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarDays, setCalendarDays] = useState<any[]>([]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const updateCalendar = (date: dayjs.Dayjs) => {
    const startOfMonth = date.startOf('month');
    const endOfMonth = date.endOf('month');

    const days: any[] = [];
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= endOfMonth.date(); i++) {
      days.push(startOfMonth.date(i));
    }

    setCalendarDays(days);
  };

  useEffect(() => {
    updateCalendar(currentDate);
  }, [currentDate]);

 // In Calendar component
 const handleDateChange = (date: dayjs.Dayjs | null) => {
  if (date) {
    setCurrentDate(date);
    setSelectedDate(date.format('YYYY-MM-DD'));  // Pass formatted date to Clockin
  }
};


  const getEntryCountForDate = (date: dayjs.Dayjs) => {
    return entries.filter(entry => dayjs(entry.date).isSame(date, 'day')).length;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DatePicker className={styles.datepicker}
             sx={{
              // Add your custom styles here
              '& .MuiInputBase-root': {

                backgroundColor: 'white',
              },
              '& .MuiInputAdornment-root': {
                // Example: customize the adornment (icon) style
                color: 'blue',
              }
            }}
          views={['year', 'month']}
          label="Select Year and Month"
          value={currentDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params}  /> }
        
         />
        <div className={styles.daysOfWeek}>
          {daysOfWeek.map((day, index) => (
            <div key={index} className={styles.dayOfWeek}>{day}</div>
          ))}
        </div>
        <div className={styles.calendar}>
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={styles.day}
              onClick={() => day && setSelectedDate(day.format('YYYY-MM-DD'))}
            >
              {day ? (
                <>
                  <div>{day.date()}</div>
                  <div className={styles.entryCount}>{getEntryCountForDate(day)}</div>
                </>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;