import axios from 'axios';
import { toast } from 'react-toastify';
import {
    CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_SUCCESS,
    DELETE_JOB_TYPE_FAIL,
    DELETE_JOB_TYPE_REQUEST,
    DELETE_JOB_TYPE_SUCCESS,
    JOB_TYPE_LOAD_FAIL,
    JOB_TYPE_LOAD_REQUEST,
    JOB_TYPE_LOAD_SUCCESS,
    UPDATE_JOB_TYPE_FAIL,
    UPDATE_JOB_TYPE_REQUEST,
    UPDATE_JOB_TYPE_SUCCESS
} from '../constants/jobTypeConstant';


// load jobs type
export const jobTypeLoadAction = () => async (dispatch) => {
    dispatch({ type: JOB_TYPE_LOAD_REQUEST });
    try {
        const url = '/api/type/jobs'
        const { data } = await axios.get(url);
        dispatch({
            type: JOB_TYPE_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: JOB_TYPE_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
    dispatch({ type: CREATE_JOB_TYPE_REQUEST })

    try {
        const {data} = await axios.post("/api/type/create", jobtype)
        console.log(data)
        dispatch({
            type: CREATE_JOB_TYPE_SUCCESS,
            payload: data.jobT
        })
        toast.success("Job type created successfully");
        dispatch(jobTypeLoadAction());
    } catch (error) {
        dispatch({
            type: CREATE_JOB_TYPE_FAIL,
            payload: error.toString()
        })
        console.log("error >>",error)
        toast.error(error.toString());

    }
}


//UpdateById
export const jobTypeUpdateAction = (id, updatedJobType) => async (dispatch) => {
    dispatch({ type: UPDATE_JOB_TYPE_REQUEST });
    const url = `/api/type/update/${id}`;
    try {
      const { data } = await axios.put(url, updatedJobType);
      console.log("data", data);
      dispatch({
        type: UPDATE_JOB_TYPE_SUCCESS,
        payload: data,
      });
      console.log("updated Data====>",data)
      toast.success("Successfully Updated");
      dispatch(jobTypeLoadAction());
    } catch (error) {
      dispatch({
        type: UPDATE_JOB_TYPE_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const deleteJobTypeAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_JOB_TYPE_REQUEST });

    try {
        console.log("in the try")
        // Make a DELETE request to the API to delete the job type
      const {data} = await axios.delete(`/api/type/delete/${id}`);

        dispatch({ type: DELETE_JOB_TYPE_SUCCESS, payload: data });
        toast.success('Job type deleted successfully');
        dispatch(jobTypeLoadAction())

    } catch (error) {
        console.log("in the catch")
        dispatch({
            type: DELETE_JOB_TYPE_FAIL,
            payload: error.response?.data?.error || 'Something went wrong during deletion'
        });
        toast.error(error.response?.data?.error || 'Something went wrong during deletion');
    }
};