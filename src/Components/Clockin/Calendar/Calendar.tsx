import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styles from './Calendar.module.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useFetchUserLoginsByEmployee } from '../../CustomHooks/CustomHooks';

interface CalendarProps {
  setSelectedDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarDays, setCalendarDays] = useState<any[]>([]);

  const { userLogins } = useFetchUserLoginsByEmployee(localStorage.getItem("employeeId") || "");
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
    console.log("Calendar updated:", days);
  };

  useEffect(() => {
    updateCalendar(currentDate);
  }, [currentDate]);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setCurrentDate(date);
      setSelectedDate(date.format('YYYY-MM-DD'));
      console.log("Selected Date changed in Calendar:", date.format('YYYY-MM-DD'));
    } else {
      console.log("Date is null in handleDateChange");
    }
  };

  const getEntryCountForDate = (date: dayjs.Dayjs) => {
    return userLogins.filter(entry => dayjs(entry.participationDate).isSame(date, 'day')).length;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.calendarContainer}>
        {/* <div className={styles.calendarleft}>
          <img
            src="../../src/assets/Images/achievement 1.png"
            alt="Celebration Icon"
            className={styles.calendarImage}
          />
        </div> */}
        <div className={styles.calendarright}>
        <DatePicker
  className={styles.datepicker}
  views={['year', 'month']}
  label="Select Year and Month"
  value={currentDate}
  onChange={handleDateChange}
  slots={{
    textField: (params) => <TextField {...params} />
  }}
  sx={{
    '& .MuiInputBase-root': {
      backgroundColor: 'white',
      fontSize: '0.875rem', // Reduced font size
      padding: '4px 8px', // Reduced padding
      height: '32px', // Reduced height
    },
    '& .MuiInputAdornment-root': {
      color: 'blue',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1rem', // Reduced icon size if applicable
    },
  }}
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
                onClick={() => {
                  if (day) {
                    const formattedDate = day.format('YYYY-MM-DD');
                    setSelectedDate(formattedDate);
                    console.log("Date clicked in calendar:", formattedDate);
                  } else {
                    console.log("Clicked on an empty day slot");
                  }
                }}
              >
                {day ? (
                  <>
                    <div>{day.date()}</div>
                    <div
                      className={styles.entryCount}
                      style={{
                        visibility: getEntryCountForDate(day) > 0 ? 'visible' : 'hidden'
                      }}
                    >
                      {getEntryCountForDate(day)}
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default Calendar;
