import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Box } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const DateRangePick: React.FC = () => {
  const [range, setRange] = useState<DateRange[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState<boolean>(false);
  const refOne = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
    return () => {
      document.removeEventListener("click", hideOnClickOutside, true);
    };
  }, []);

  const hideOnClickOutside = (e: MouseEvent) => {
    if (refOne.current && !refOne.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const selection = ranges.selection;
    if (selection) {
      setRange([
        {
          startDate: selection.startDate!,
          endDate: selection.endDate!,
          key: selection.key || "selection", // Provide a default value if key is undefined
        },
      ]);
    }
  };

  return (
    <>
      <Box>
        {open && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backdropFilter: "blur(10px)",
              zIndex: 99, // Ensure it's behind the DateRangePicker but above other content
            }}
          />
        )}
        <Box
          sx={{
            width: "25%",
            height: "100%",
            display: "flex",
            alignItems: "center", // Align items vertically center
            justifyContent: "center", // Align items horizontally to the start
            fontSize: {
              xs: "8vw", // Extra small devices (phones, 600px and down)
              sm: "5vw", // Small devices (tablets, 600px and up)
              md: "4.5vw", // Medium devices (desktops, 900px and up)
              lg: "3vw", // Large devices (large desktops, 1200px and up)
              xl: "2.5vw", // Extra large devices (larger desktops, 1536px and up)
            },
          }}
        >
          <CalendarMonthIcon
            fontSize="inherit"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          />
          {open && (
            <Box
              sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "100",
                border: "1px solid gray", // Add border with width, style, and color
              }}
              ref={refOne}
            >
              <DateRangePicker
                onChange={handleSelect}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                ranges={range}
                months={1}
                direction="horizontal"
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default DateRangePick;
