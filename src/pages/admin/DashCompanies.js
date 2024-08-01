import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {
  companyLoadAction,
  deleteCompanyAction,
} from "../../redux/actions/companyAction";
// import CreateModal from "../../components/CreateModal";
import Meta from "../Meta";
import CreateModal from "../../components/CreateModal";
import DashUpdateCompany from "./DashUpdateCompany";

// import {
//   Button
// } from "@nextui-org/react";

const DashCompanies = (params) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    dispatch(companyLoadAction());
  }, []);

  const { companies, loading } = useSelector((state) => state.loadCompanies);
  // console.log(companies);
  let data = [];
  data = companies !== undefined && companies.length > 0 ? companies : [];
  const numberedData = data.map((row, index) => ({
    number: index + 1,
    ...row,
  }));

  const handleDeleteConfirmation = (e, company_id) => {
    e.preventDefault();
    setSelectedCompanyId(company_id);
    setOpenDialog(true);
  };

  const handleDeleteCompany = () => {
    setOpenDialog(false);
    if (selectedCompanyId) {
      dispatch(deleteCompanyAction(selectedCompanyId));
      // window.fetch()
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompanyId(null);
  };
  //delete job by Id

  const columns = [
    {
      field: "number",
      headerName: "No",
      width: 60,
    },
    {
      field: "companyLogo",
      headerName: "Logo",
      width: 150,
      renderCell: (params) => {
        return (
          <img
            src={params.value}
            alt={`Logo-${params.row.companyName}`}
            style={{ width: "50%", height: "auto", padding: "10px" }}
          />
        );
      },
    },
    {
      field: "companyName",
      headerName: "Name",
      width: 150,
    },

    {
      field: "companyEmail",
      headerName: "Email",
      width: 150,
    },
    {
      field: "companyPhone",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "location",
      headerName: "Location",
      width: 150,
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
          <DashUpdateCompany
            id={params.row._id}
            name={params.row?.companyName}
            companyLogo={params.row?.companyLogo}
            description={params.row?.description}
            location={params.row?.location}
            companyEmail={params.row?.companyEmail}
            companyPhone={params.row?.companyPhone}
          />

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
    <>
      <Meta title={"j4u - dash companies"} />

      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Companies list
        </Typography>
        <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
          <CreateModal />

          {/* <Button auto ghost color="error" onClick={handler}>
  Create{<AddIcon />}
  </Button> */}
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
              pageSize={5}
              rowsPerPageOptions={[5]}
              slots={{ toolbar: GridToolbar }}
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
            }}
          >
            Delete Company
          </DialogTitle>
          <DialogContent sx={{ bgcolor: "#003366" }}>
            <DialogContentText>
              Are you sure you want to delete ?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ bgcolor: "#003366" }}>
            <Button onClick={handleCloseDialog} sx={{ bgcolor: "#eee" }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteCompany}
              variant="contained"
              color="error"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default DashCompanies;
