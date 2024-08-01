import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, InputBase } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const validationSchema = yup.object({
    search: yup
        .string('Enter your search query')
        .required('this field can not be empty'),
});

const SearchInputEl = () => {

    const navigate = useNavigate();

    const onSubmit = (values, actions) => {
        //alert(values.search);
        const { search } = values;
        if (search.trim()) {
            navigate(`/search/${search}`);
        } else {
            navigate('/');
        }
        actions.resetForm();
    }

    const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            search: '',
        },

        validationSchema: validationSchema,
        onSubmit
    });

    return (

        <form onSubmit={handleSubmit} style={{ width: '50%' }} className='searchJob'>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center',marginTop:'70px',borderColor: "#2d2d2d"}}>
                {/* <Search> */}

                <InputBase sx={{ bgcolor: 'white', padding: '10px', color: "rgba(0, 0, 0, 0.9)" ,border:"2px red"}}
                    fullWidth={true}
                    id="search"
                    name="search"
                    label="search"
                    placeholder='ex: developer, front end'
                    value={values.search}
                    onChange={handleChange}
                    error={touched.search && Boolean(errors.search)}
                  
                // helperText={touched.search && errors.search}
                ></InputBase>

                <Button sx={{bgcolor:"#003366"}} variant="contained" type="submit" disabled={isSubmitting} >
                    <SearchIcon/> 
                </Button>
            </Box>
            <Box component='span' sx={{ color: 'orange' }}>{touched.search && errors.search}</Box>
        </form>

    );
};

export default SearchInputEl;

