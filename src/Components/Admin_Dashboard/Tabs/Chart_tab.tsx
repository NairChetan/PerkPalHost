// import React from "react";
// import { Box, Tab } from "@mui/material";
// import { TabContext, TabList, TabPanel } from "@mui/lab";
// import Employee_chart from "../Charts/Employee_chart";
// import DU_chart from "../Charts/DU_chart";

// interface ChartTabProps {
//   selectedTab: string;
//   handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
// }

// const Chart_tab: React.FC<ChartTabProps> = ({
//   selectedTab,
//   handleTabChange,
// }) => {
//   return (
//     <Box sx={{ width: "100%", height: "100%" }}>
//       <TabContext value={selectedTab}>
//         <Box
//           sx={{
//             borderBottom: 1,
//             borderColor: "divider",
//             width: "100%",
//             height: "10%",
//           }}
//         >
//           <TabList
//             aria-label="Tabs example"
//             onChange={handleTabChange}
//             textColor="primary"
//             indicatorColor="primary"
//             centered
//             TabIndicatorProps={{
//               style: {
//                 backgroundColor: "#06c", // Change the color of the indicator line
//                 height: "3px", // Change the height of the indicator line
//                 boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
//               },
//             }}
//           >
//             <Tab
//               label="Employee-Data"
//               value="1"
//               sx={{
//                 p: 0,
//                 m: 0,
//                 fontWeight: 600,
//                 fontSize: {
//                   xs: "3.5vw", // Extra small devices (phones, 600px and down)
//                   sm: "2.7vw", // Small devices (tablets, 600px and up)
//                   md: "2vw", // Medium devices (desktops, 900px and up)
//                   lg: "1.5vw", // Large devices (large desktops, 1200px and up)
//                   xl: "1.5vw", // Extra large devices (larger desktops, 1536px and up)
//                 },
//               }}
//             />
//             <Tab
//               label="DU-Data"
//               value="2"
//               sx={{
//                 pr: "1%",
//                 m: 0,
//                 fontWeight: 600,
//                 fontSize: {
//                   xs: "3.5vw", // Extra small devices (phones, 600px and down)
//                   sm: "2.7vw", // Small devices (tablets, 600px and up)
//                   md: "2vw", // Medium devices (desktops, 900px and up)
//                   lg: "1.5vw", // Large devices (large desktops, 1200px and up)
//                   xl: "1.5vw", // Extra large devices (larger desktops, 1536px and up)
//                 },
//               }}
//             />
//           </TabList>
//         </Box>
//         <TabPanel value="1" sx={{ p: 0, width: "100%", height: "100%" }}>
//           <Employee_chart />
//         </TabPanel>
//         <TabPanel value="2" sx={{ p: 0, width: "100%", height: "100%" }}>
//           <DU_chart />
//         </TabPanel>
//       </TabContext>
//     </Box>
//   );
// };

// export default Chart_tab;

import React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Employee_chart from "../Charts/Employee_chart";
import DU_chart from "../Charts/DU_chart";

interface ChartTabProps {
  selectedTab: string;
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const Chart_tab: React.FC<ChartTabProps> = ({
  selectedTab,
  handleTabChange,
}) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <TabContext value={selectedTab}>
        <Box
          sx={{
            borderBottom: 2,
            borderColor: "divider",
            width: "100%",
            height: "10%",
          }}
        >
          <TabList
            aria-label="Tabs example"
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary"
            centered
            TabIndicatorProps={{
              style: {
                display: "none", // Hide the indicator line
              },
            }}
          >
            <Tab
              label="Employee-Data"
              value="1"
              sx={{
                p: 0,
                m: 0,
                fontWeight: 600,
                fontSize: {
                  xs: "3.5vw", // Extra small devices (phones, 600px and down)
                  sm: "2.7vw", // Small devices (tablets, 600px and up)
                  md: "2vw", // Medium devices (desktops, 900px and up)
                  lg: "1.5vw", // Large devices (large desktops, 1200px and up)
                  xl: "1.5vw", // Extra large devices (larger desktops, 1536px and up)
                },
              }}
            />
            <Tab
              label="DU-Data"
              value="2"
              sx={{
                pr: "1%",
                m: 0,
                fontWeight: 600,
                fontSize: {
                  xs: "3.5vw", // Extra small devices (phones, 600px and down)
                  sm: "2.7vw", // Small devices (tablets, 600px and up)
                  md: "2vw", // Medium devices (desktops, 900px and up)
                  lg: "1.5vw", // Large devices (large desktops, 1200px and up)
                  xl: "1.5vw", // Extra large devices (larger desktops, 1536px and up)
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            pt: "1%",
            pr: "0%",
            pl: "0%",
            pb: "0%",
            width: "100%",
            height: "100%",
          }}
        >
          <Employee_chart />
        </TabPanel>
        <TabPanel
          value="2"
          sx={{
            pt: "1%",
            pr: "0%",
            pl: "0%",
            pb: "0%",
            width: "100%",
            height: "100%",
          }}
        >
          <DU_chart />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Chart_tab;
