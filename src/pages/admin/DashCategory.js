import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteJobTypeAction,
  jobTypeLoadAction,
} from "../../redux/actions/jobTypeAction";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

import moment from "moment";
import Meta from "../Meta";
import DashUpdateCategoryModal from "./DashUpdateCategoryModal";
// import DashUsers from "./DashUsers";

const DashCategory = (params) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobTypeId, setSelectedJobTypeId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, [dispatch]);

  const { jobType, loading } = useSelector((state) => state.jobTypeAll);
  let data = [];
  data = jobType !== undefined && jobType.length > 0 ? jobType : [];
  const numberedData = data.map((row, index) => ({
    number: index + 1,
    ...row,
  }));

  const handleDeleteConfirmation = (e, type_id) => {
    e.preventDefault();
    setSelectedJobTypeId(type_id);
    setOpenDialog(true);
  };

  const handleDeleteJobCategory = () => {
    setOpenDialog(false);
    if (selectedJobTypeId) {
      dispatch(deleteJobTypeAction(selectedJobTypeId));
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedJobTypeId(null);
  };

  const columns = [
    {
      field: "number",
      headerName: "No",
      width: 60,
    },
    {
      field: "jobTypeName",
      headerName: "Category",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Create At",
      width: 250,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },

    {
      field: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "170px",
          }}
        >
        <DashUpdateCategoryModal id={params.row._id} initialText={params.row?.jobTypeName} />

          <Button
            onClick={(e) => handleDeleteConfirmation(e, params.row._id)}
            variant="contained"
            color="error"
          >
            {<DeleteForeverRoundedIcon />}
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Meta title={"dash categories"} />

      <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
        Jobs category
      </Typography>
      <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
        <Button variant="contained" color="success" startIcon={<AddIcon />}>
          {" "}
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/category/create"
          >
            Create Category
          </Link>
        </Button>
      </Box>
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
                bgcolor: (theme) =>
                  // theme.palette.mode === 'light' ? grey[200] : grey[900],
                  theme.palette.secondary.main,
              },
              button: {
                color: "#ffffff",
              },
            }}
            rows={numberedData}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            // components={{ Toolbar: GridToolbarExport }}
          />
        </Box>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          className="text-center"
          sx={{
            bgcolor: "#2d2d2d",
            justifyContent: "center",
            alignItems: "center",
            color:"#fff"
          }}
        >
          Delete Job Category
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#003366" }}>
          <DialogContentText>
            Are you sure you want to delete this job category?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#003366" }}>
          <Button onClick={handleCloseDialog} sx={{ bgcolor: "#eee" }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteJobCategory}
            variant="contained"
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashCategory;
