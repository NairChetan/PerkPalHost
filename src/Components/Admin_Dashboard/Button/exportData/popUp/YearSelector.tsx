import { useState } from "react";
import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

const YearSelector = () => {
  const [year, setYear] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ marginBottom: "1.5rem" }}>
        <DatePicker
          views={["year"]} // Limit to selecting only the year
          label="Year"
          value={year}
          onChange={(newValue) => setYear(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small", // Makes the DatePicker smaller
              sx: {
                backgroundColor: "#303137", // Fill color
                borderRadius: "8px", // Optional: adds rounded corners
                input: { color: "#fff" }, // Text color inside the input
                "& .MuiInputLabel-root": {
                  color: "#fff", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff", // Border color on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Border color when focused
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: "#fff", // Icon color (calendar icon)
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default YearSelector;
