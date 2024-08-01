import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { jobTypeUpdateAction } from "../../redux/actions/jobTypeAction";

// const validationSchema = yup.object({
//     jobTypeName: yup.string("Enter a JobType Name").required("Name is required"),
// });

const DashUpdateCategoryModal = ({ id, initialText, onClose }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // onClose(); // Close the modal
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const formik = useFormik({
    initialValues: {
      jobTypeName: initialText,
    },
    // validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(jobTypeUpdateAction(id, values));
      actions.resetForm();
      navigate("/admin/category");
      handleCloseDialog(); // Close the dialog
    },

  });

  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
      {<EditNoteRoundedIcon />}
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{color:"#2d2d2d"}}>
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style text-dark"
          
        >
          <DialogTitle sx={{justifyContent:"center",alignItems:"center",color:"#2d2d2d"}}>Update Category</DialogTitle>
          <Box sx={{color:"#eee"}}>
            <TextField
              fullWidth
              sx={{
                mb: 3,
                "& .MuiInputBase-root": {
                  color: "#003366",
                },
                fieldset: { borderColor: "#2d2d2d" },
              }}
              id="jobTypeName"
              label="jobTypeName"
              name="jobTypeName"
            //   placeholder="jobTypeName"
              value={formik.values.jobTypeName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobTypeName && Boolean(formik.errors.jobTypeName)}
              helperText={formik.touched.jobTypeName && formik.errors.jobTypeName}
            />
            <Button fullWidth variant="contained" type="submit" >
              Update
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default DashUpdateCategoryModal;
