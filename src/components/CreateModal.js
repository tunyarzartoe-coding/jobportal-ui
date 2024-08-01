import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Text, Input, Row, Grid } from "@nextui-org/react";
import { createCompanyAction } from "../redux/actions/companyAction";
import { Box, Container, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./css/UploadImage.css";
import { useTheme } from "@emotion/react";

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

export default function CreateModal() {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleSelectImage = () => {
    document.getElementById("companyLogo").click();
  };

  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

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
      console.log("onSubmit");
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
      setVisible(false);
      navigate("/admin/companies");
    },
  });
  const handleFileChange = (event) => {
    const image = event.currentTarget.files[0];
    if (image.size < 2000000) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);

      // Set the value of the "companyLogo" field in the formik form
      formik.setFieldValue("companyLogo", image);
    } else {
      alert("Image size more than 2MB");
    }
  };

  return (
    <Box>
      <Button auto ghost color="primary" onPress={handler}>
        {<AddIcon />}Create
      </Button>
      <Box sx={{ bgcolor: "#003366" }}>
        <Modal
          closeButton
          preventClose
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
          width="900px"
          style={{ backgroundColor: "#003366" }}
        >
          <Modal.Header>
            <Text id="modal-title" className="text-white" size={25}>
              Create Company
            </Text>
          </Modal.Header>
          <Box
            onSubmit={formik.handleSubmit}
            component="form"
            className=" comModal border-style p-4"
            sx={{ bgcolor: "#003366" }}
          >
            {" "}
            <Grid container>
              <Grid item xs={6}>
                <div
                  className="container imageUp mb-0 my-0 w-100"
                  style={{ backgroundColor: "#003366" }}
                >
                  <input
                    id="companyLogo"
                    name="companyLogo"
                    type="file"
                    style={{ display: "none", backgroundColor: "#003366" }}
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={
                      formik.touched.companyLogo &&
                      Boolean(formik.errors.companyLogo)
                    }
                    helperText={
                      formik.touched.companyLogo && formik.errors.companyLogo
                    }
                  />
                  <div className="img-area" onClick={handleSelectImage}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Company Logo" />
                    ) : (
                      <>
                        <CloudUploadIcon />
                        <h3 className="text-dark">Upload Logo</h3>
                      </>
                    )}
                  </div>
                </div>
              </Grid>

              <Grid item sx={6} >
                <TextField
                  sx={{ mb: 3 ,fieldset: { borderColor: "#eee" }}}
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
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                />
              </Grid>
              <Grid item sx={6} >
                <TextField
                  sx={{ mb: 3,fieldset: { borderColor: "#eee" } }}
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
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item sx={12} >
                <TextField
                  sx={{ mb: 3 ,fieldset: { borderColor: "#eee" }}}
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
              </Grid>

              <Grid item sx={12}>
                <TextField
                  sx={{ mb: 3 ,fieldset: { borderColor: "#eee" },}}
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
              </Grid>

              <Grid item sx={12}>
                <TextField
                  sx={{ mb: 3,fieldset: { borderColor: "#eee" }, }}
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
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                />
              </Grid>

              <div className="d-flex justify-content-end align-items-end">
                <Button auto flat color="default" onPress={closeHandler}>
                  Close
                </Button>
                <Button variant="contained" type="submit" className="mx-2">
                  Create Company{" "}
                </Button>
              </div>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
