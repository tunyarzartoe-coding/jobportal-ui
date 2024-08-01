import { Box, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { createJobTypeAction } from '../../redux/actions/jobTypeAction';
import { useNavigate } from 'react-router-dom';
import Meta from '../Meta';



const validationSchema = yup.object({

    jobTypeName: yup
        .string('Enter a Category')
        .required('Category is required'),
});


const DashCreateCategory = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            user: user && user._id,
            jobTypeName: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            dispatch(createJobTypeAction(values))
            //alert(JSON.stringify(values, null, 2));
            actions.resetForm();
            navigate('/admin/category')

        },
    });


    return (
        <>
          <Meta title={"create category"} />

            <Box sx={{ height: '100%', display: "flex", alignItems: "center", justifyContent: "center", pt: 4 }}>


                <Box onSubmit={formik.handleSubmit} component="form" className='form_style border-style' sx={{bgcolor:"#003366",color:"#fff"}} >
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <Typography variant="h5" component="h2" sx={{ pb: 3 }}>
                            Create a Category
                        </Typography>
                        <TextField sx={{ mb: 3 }}
                            fullWidth
                            id="jobTypeName"
                            label="category"
                            name='jobTypeName'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="category name"
                            value={formik.values.jobTypeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.jobTypeName && Boolean(formik.errors.jobTypeName)}
                            helperText={formik.touched.jobTypeName && formik.errors.jobTypeName}
                        />


                        <Button fullWidth variant="contained" type='submit' >Create category</Button>
                    </Box>
                </Box>
            </Box>

        </>
    )
}

export default DashCreateCategory