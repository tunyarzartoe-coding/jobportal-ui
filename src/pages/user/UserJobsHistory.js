import { Paper, Typography, gridClasses } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import CardElement from "../../components/CardElement";
import Meta from "../Meta";
import { DataGrid } from "@mui/x-data-grid";

const UserJobsHistory = () => {
  // Fetch the user data from the Redux store using useSelector hook
  const { user } = useSelector((state) => state.userProfile);

  // Check if user.jobsHistory exists and has items, otherwise, set an empty array
  let data = user?.jobsHistory !== undefined && user?.jobsHistory.length > 0 ? user.jobsHistory : [];
  console.log(data)
  const numberedData = data.map((row, index) => ({
    number: index + 1,
    ...row,
  }));

  // Define the columns for the DataGrid
  const columns = [
    {
      field: "number",
      headerName: "No",
      width: 60,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
    },
  
    {
      field: "jobType",
      headerName: "Category",
      width: 150,
      valueGetter: (params) => params.row.jobType, 
    },
    {
      field: "company",
      headerName: "Company ",
      width: 150,
      valueGetter: (params) => params.row.company,
    },
    {
      field: "salary",
      headerName: "Salary",
      type: "number", 
      width: 150,
      renderCell: (params) => "$" + params.row.salary, 
    },
  ];

  return (
    <>
      <Meta title={"job history"} />

      <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
        Job History list
      </Typography>

      <Paper sx={{ bgcolor: "secondary.midNightBlue" }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row._id} 
            sx={{
              "& .MuiTablePagination-displayedRows": {
                color: "white",
              },
              color: "white",
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => theme.palette.secondary.main,
              },
              button: {
                color: "#ffffff",
              },
            }}
            rows={numberedData} 
            columns={columns} 
            pageSize={5} 
            rowsPerPageOptions={[5]} 
          />
        </Box>
      </Paper>
    </>
  );
};

export default UserJobsHistory;
