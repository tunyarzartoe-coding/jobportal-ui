import { Box, MenuItem, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCompanyAction } from "../../redux/actions/companyAction";
import Meta from "../Meta";

const validationSchema = yup.object({
  companyName: yup
    .string("Enter a company name")
    .required("company name is required"),
  companyLogo: yup
    .string("Enter a company name")
    .required("company name is required"),
  description: yup
    .string("Enter a description")
    .min(6, "Description should be of minimum 6 characters length")
    .required("Description is required"),
  companyPhone: yup.string("Enter company phone").required("Phone is required"),
  companyEmail: yup.string("Enter company phone").required("Phone is required"),
  location: yup.string("Enter a location").required("Location is required"),
});

const DashCreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyLogo: null,
      description: "",
      companyPhone: "",
      companyEmail: "",
      location: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      const formData = new FormData();
      formData.append("companyName", values.companyName);
      formData.append("description", values.description);
      formData.append("companyEmail", values.companyEmail);
      formData.append("location", values.location);
      formData.append("companyPhone", values.companyPhone);
      formData.append("companyLogo", values.companyLogo);

      dispatch(createCompanyAction(formData));
      // alert(JSON.stringify(values, null, 2));
      actions.resetForm();
      navigate("/admin/companies");
    },
  });

  return (
    <>
    <Meta title={"create company"}/>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border-style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
              Create A Company
            </Typography>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Name"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
            />
            <input
              sx={{ mb: 4 }}
              fullWidth
              id="companyLogo"
              name="companyLogo"
              label="Company Logo"
              type="file"
              InputLabelProps={{
                shrink: true,
                
              }}
              onChange={(event) => {
                formik.setFieldValue(
                  "companyLogo",
                  event.currentTarget.files[0]
                ); // Use setFieldValue to set the File object
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyLogo && Boolean(formik.errors.companyLogo)
              }
              helperText={
                formik.touched.companyLogo && formik.errors.companyLogo
              }
              className="mb-5"
            >           
            </input>
            
            

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
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="companyPhone"
              name="companyPhone"
              label="Phone"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Phone"
              value={formik.values.companyPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyPhone &&
                Boolean(formik.errors.companyPhone)
              }
              helperText={
                formik.touched.companyPhone && formik.errors.companyPhone
              }
            />
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="companyEmail"
              name="companyEmail"
              label="Email"
              type="email"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Email"
              value={formik.values.companyEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.companyEmail &&
                Boolean(formik.errors.companyEmail)
              }
              helperText={
                formik.touched.companyEmail && formik.errors.companyEmail
              }
            />

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

            <Button fullWidth variant="contained" type="submit">
              Create Company
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashCreateCompany;
