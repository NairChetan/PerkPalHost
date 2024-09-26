// import { useState, useRef } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   TextField,
//   IconButton,
//   Box,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";

// const CategoryRequest = () => {
//   const [expanded, setExpanded] = useState(false);
//   const refOne = useRef(null);

//   const handleExpandClick = (panel) => (event) => {
//     event.stopPropagation(); // Prevent other click events
//     event.preventDefault(); // Prevent default behavior
//     setExpanded(expanded === panel ? false : panel);
//   };

//   const renderAccordion = (id) => (
//     <Accordion
//       key={id}
//       expanded={expanded === `panel${id}`}
//       sx={{
//         backgroundColor: "#797878",
//         color: "white",
//         borderRadius: "20px",
//         marginBottom: "10px",
//         "&:before": {
//           display: "none", // Removes the default divider line
//         },
//       }}
//     >
//       <AccordionSummary
//         sx={{
//           justifyContent: "flex-start",
//           alignItems: "center", // Vertically centers content in the row
//         }}
//       >
//         <IconButton onClick={handleExpandClick(`panel${id}`)} color="inherit">
//           <ExpandMoreIcon />
//         </IconButton>
//         <Typography sx={{ width: "30%", flexShrink: 1, marginLeft: "8px" }}>
//           Requested By
//         </Typography>
//         <Typography sx={{ width: "30%", flexShrink: 0 }}>Category</Typography>
//         <Typography sx={{ width: "30%", flexShrink: 0 }}>Activity</Typography>
//         <IconButton color="success" sx={{ padding: 0 }}>
//           <CheckCircleIcon sx={{ fontSize: 28 }} />
//         </IconButton>
//         <IconButton color="error">
//           <CancelIcon sx={{ fontSize: 28 }} />
//         </IconButton>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Box display="flex" justifyContent="space-between" width="100%">
//           <Box width="45%">
//             <Typography variant="body1">
//               Description of the category request goes here.
//             </Typography>
//           </Box>
//           <Box width="45%">
//             <TextField label="Set Points" variant="outlined" fullWidth />
//           </Box>
//         </Box>
//       </AccordionDetails>
//     </Accordion>
//   );

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Category Request
//       </Typography>

//       {/* Render multiple accordions */}
//       {Array.from({ length: 4 }, (_, index) => renderAccordion(index + 1))}
//     </Box>
//   );
// };

// export default CategoryRequest;
