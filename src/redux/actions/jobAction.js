import axios from 'axios';
import { toast } from 'react-toastify'
import {
    JOB_BY_COMPANYID_FAIL,
    JOB_BY_COMPANYID_REQUEST,
    JOB_BY_COMPANYID_SUCCESS,
    JOB_LOAD_FAIL,
    JOB_LOAD_REQUEST,
    JOB_LOAD_SINGLE_FAIL,
    JOB_LOAD_SINGLE_REQUEST,
    JOB_LOAD_SINGLE_SUCCESS,
    JOB_LOAD_SUCCESS,
    REGISTER_JOB_FAIL,
    REGISTER_JOB_REQUEST,
    REGISTER_JOB_SUCCESS,
    UPDATE_JOB_FAIL,
    UPDATE_JOB_REQUEST,
    UPDATE_JOB_SUCCESS
} from "../constants/jobConstant"


export const jobLoadAction = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
        const { data } = await axios.get(`/api/jobs/show/?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`)
        dispatch({
            type: JOB_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

// single job action
export const jobLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_LOAD_SINGLE_REQUEST });
    const url = `/api/job/${id}`
    try {
        const {data} = await axios.get(url);
        console.log("data",data)
        dispatch({
            type: JOB_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}

//jobByCompanyId
export const jobByCompanyIdAction = (id) => async (dispatch) => {
    dispatch({ type: JOB_BY_COMPANYID_REQUEST });
    const url = `/api/jobByCompanyId/${id}`
    try {
        const {data} = await axios.get(url);
        console.log("data",data)
        dispatch({
            type: JOB_BY_COMPANYID_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_BY_COMPANYID_FAIL,
            payload: error.response.data.error
        });
    }
}


//updateById
export const jobUpdateAction = (id,updatedJobData) => async (dispatch) => {
    dispatch({ type: UPDATE_JOB_REQUEST });
    const url = `/api/job/update/${id}`
    try {
        const { data } = await axios.put(url, updatedJobData);
        console.log("data",data)
        dispatch({
            type: UPDATE_JOB_SUCCESS,
            payload: data
        });
        toast.success("Successfully Updated")
        dispatch(jobLoadAction())
    } catch (error) {
        dispatch({
            type: UPDATE_JOB_FAIL,
            payload: error.response.data.error
        });
    }
}


// register job action
export const registerAjobAction = (job) => async (dispatch) => {
    dispatch({ type: REGISTER_JOB_REQUEST })

    try {
        const { data } = await axios.post("/api/job/create", job)
        dispatch({
            type: REGISTER_JOB_SUCCESS,
            payload: data
        })
        toast.success("Job created successfully");
        dispatch(jobLoadAction())


    } catch (error) {
        dispatch({
            type: REGISTER_JOB_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error);

    }
}