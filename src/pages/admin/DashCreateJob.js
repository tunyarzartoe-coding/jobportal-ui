import { Box, Dialog, Grid, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { jobTypeLoadAction } from "../../redux/actions/jobTypeAction";
import { useNavigate } from "react-router-dom";
import { registerAjobAction } from "../../redux/actions/jobAction";
import { companyLoadAction } from "../../redux/actions/companyAction";

const validationSchema = yup.object({
  title: yup.string("Enter a job title").required("Title is required"),
  description: yup
    .string("Enter a description")
    .min(6, "Description should be of minimum 6 characters length")
    .required("Description is required"),
  salary: yup.number("Enter a salary").required("Salary is required"),
  location: yup.string("Enter a location").required("Location is required"),
  jobType: yup.string("Enter a Category").required("Category is required"),
  company: yup.string("Enter a Company").required("Company is required"),
});

const DashCreateJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);


  //job type
  useEffect(() => {
    dispatch(jobTypeLoadAction());
    dispatch(companyLoadAction());
  }, []);

  const { jobType } = useSelector((state) => state.jobTypeAll);
  const { companies } = useSelector((state) => state.loadCompanies);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      salary: "",
      location: "",
      jobType: "",
      company: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(registerAjobAction(values));
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      navigate("/admin/jobs");
      handleCloseDialog(); 

    },
  });

  return (
    <><Button variant="contained" onClick={handleOpenDialog}>
   Create Job
  </Button>

  <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    sx={{ color: "#2d2d2d" }}
  >
    <Box
    sx={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      
    }}
  >
    <Box
      onSubmit={formik.handleSubmit}
      component="form"
      className="form_style border-style"
      sx={{
        width: "100%",
        bgcolor: "#003366",
        padding: "24px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
       <Typography variant="h5" component="h2" sx={{ pb: 3, color: "white" }} className="text-center">
          Create Job
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="salary"
              name="salary"
              label="Salary"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.salary && Boolean(formik.errors.salary)}
              helperText={formik.touched.salary && formik.errors.salary}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="location"
              name="location"
              label="Location"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              className="px-2 my-2"
              variant="outlined"
              name="jobType"
              id="jobType"
              select
              label="Category"
              value={formik.values.jobType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobType && Boolean(formik.errors.jobType)}
              helperText={formik.touched.jobType && formik.errors.jobType}
            >
              <MenuItem key={""} value={""}></MenuItem>
              {jobType &&
                jobType.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id} sx={{bgcolor:"#003366",color:"blue"}}>
                    {cat.jobTypeName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              className="px-2 my-2"
              variant="outlined"
              name="company"
              id="company"
              select
              label="Company"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            >
              {companies &&
                companies.map((company) => (
                  <MenuItem key={company._id} value={company._id} sx={{bgcolor:"#003366",color:"blue"}}>
                    {company.companyName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>
        <Button fullWidth variant="contained" type="submit">
          Create
        </Button>
      </Box>
    </Box>
    </Dialog>
    </>
  );
};

export default DashCreateJob;
