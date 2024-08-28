// import React, { useEffect, useRef, useState } from "react";
// import { DateRangePicker, RangeKeyDict } from "react-date-range";
// import { addDays } from "date-fns";

// import "react-date-range/dist/styles.css"; // main style file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { Box } from "@mui/material";
// import format from "date-fns/format";

// interface DateRange {
//   startDate: Date;
//   endDate: Date;
//   key: string;
// }

// const DateRangePick: React.FC = () => {
//   const [range, setRange] = useState<DateRange[]>([
//     {
//       startDate: new Date(),
//       endDate: addDays(new Date(), 30),
//       key: "selection",
//     },
//   ]);
//   const [open, setOpen] = useState<boolean>(false);
//   const refOne = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     document.addEventListener("click", hideOnClickOutside, true);
//     return () => {
//       document.removeEventListener("click", hideOnClickOutside, true);
//     };
//   }, []);

//   const hideOnClickOutside = (e: MouseEvent) => {
//     if (refOne.current && !refOne.current.contains(e.target as Node)) {
//       setOpen(false);
//     }
//   };

//   const handleSelect = (ranges: RangeKeyDict) => {
//     const selection = ranges.selection;
//     if (selection) {
//       setRange([
//         {
//           startDate: selection.startDate!,
//           endDate: selection.endDate!,
//           key: selection.key || "selection", // Provide a default value if key is undefined
//         },
//       ]);
//     }
//   };

//   return (
//     <>
//       <Box>
//         {open && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               backdropFilter: "blur(10px)",
//               zIndex: 99, // Ensure it's behind the DateRangePicker but above other content
//             }}
//           />
//         )}

//         <input
//           value={`${format(range[0].startDate, "MMM/dd")} to ${format(
//             range[0].endDate,
//             "MMM/dd"
//           )}`}
//           readOnly
//           style={{
//             width: "10vw",
//             minWidth: "10vw",
//             margin: 0,
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "4px",
//             fontSize: "16px",
//             backgroundColor: "#f9f9f9",
//             boxSizing: "content-box",
//             cursor: "pointer",
//             overflow: "hidden",
//             textAlign: "center",
//             color: "#06c",
//           }}
//           className="inputBox"
//           onClick={() => setOpen((open) => !open)}
//         />
//         {open && (
//           <Box
//             sx={{
//               position: "fixed",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               zIndex: "100",
//               border: "1px solid gray", // Add border with width, style, and color
//             }}
//             ref={refOne}
//           >
//             <DateRangePicker
//               onChange={handleSelect}
//               editableDateInputs={true}
//               moveRangeOnFirstSelection={false}
//               ranges={range}
//               months={1}
//               direction="horizontal"
//             />
//           </Box>
//         )}
//       </Box>
//     </>
//   );
// };

// export default DateRangePick;

import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Box } from "@mui/material";
import format from "date-fns/format";

interface DateRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRangePickProps {
  onDateRangeChange: (startDate: Date, endDate: Date) => void; // Callback to pass the date range to the parent
}

const DateRangePick: React.FC<DateRangePickProps> = ({ onDateRangeChange }) => {
  const [range, setRange] = useState<DateRange[]>([
    {
      startDate: addDays(new Date(), -30),
      endDate: new Date(),
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

  useEffect(() => {
    // Pass the initial default dates to the parent when the component mounts
    onDateRangeChange(range[0].startDate, range[0].endDate);
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
      // Pass the updated dates to the parent component
      onDateRangeChange(selection.startDate!, selection.endDate!);
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

        <input
          value={`${format(range[0].startDate, "MMM/dd")} to ${format(
            range[0].endDate,
            "MMM/dd"
          )}`}
          readOnly
          style={{
            width: "10vw",
            minWidth: "10vw",
            margin: 0,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
            backgroundColor: "#f9f9f9",
            boxSizing: "content-box",
            cursor: "pointer",
            overflow: "hidden",
            textAlign: "center",
            color: "#06c",
          }}
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
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
    </>
  );
};

export default DateRangePick;
