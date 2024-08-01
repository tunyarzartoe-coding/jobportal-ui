import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const SelectComponent = ({ handleChangeCategory, cat }) => {
    const { palette } = useTheme();


    const { jobType } = useSelector(state => state.jobTypeAll);

    return (
        <Box sx={{ minWidth: 120 ,borderColor: "#eee" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"sx={{color: palette.primary.oth}}>Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cat}
                    label="Category"
                    onChange={handleChangeCategory}
                    sx={{border: 1.5}}
                >
                    <MenuItem value="" sx={{color: "blue"}}>All</MenuItem>
                    {
                        jobType && jobType.map(jt => (
                            <MenuItem key={jt._id} value={jt._id} sx={{color: "blue",bgcolor:palette.primary.oth}}>{jt.jobTypeName}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectComponent