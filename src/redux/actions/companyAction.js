import axios from "axios";
import { COMPANY_LOAD_FAIL, COMPANY_LOAD_REQUEST, COMPANY_LOAD_SINGLE_FAIL, COMPANY_LOAD_SINGLE_REQUEST, COMPANY_LOAD_SINGLE_SUCCESS, COMPANY_LOAD_SUCCESS, DELETE_COMPANY_FAIL, DELETE_COMPANY_REQUEST, DELETE_COMPANY_SUCCESS, REGISTER_COMPANY_FAIL, REGISTER_COMPANY_REQUEST, REGISTER_COMPANY_SUCCESS, UPDATE_COMPANY_FAIL, UPDATE_COMPANY_REQUEST, UPDATE_COMPANY_SUCCESS } from "../constants/companyConstant";
import { toast } from "react-toastify";

export const companyLoadAction = (pageNumber, keyword = '',  location = '') => async (dispatch) => {
    dispatch({ type: COMPANY_LOAD_REQUEST });
    try {
        const url = `/api/companies/show/?pageNumber=${pageNumber}&keyword=${keyword}&location=${location}`
        const { data } = await axios.get(url)
        dispatch({
            type: COMPANY_LOAD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: COMPANY_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//Create Company
export const createCompanyAction = (company) => async (dispatch) => {
    dispatch({ type: REGISTER_COMPANY_REQUEST })

    try {
        const { data } = await axios.post("/api/company/create", company)
        dispatch({
            type: REGISTER_COMPANY_SUCCESS,
            payload: data
        })
        toast.success("Company is created successfully");
        dispatch(companyLoadAction())


    } catch (error) {
        dispatch({
            type: REGISTER_COMPANY_FAIL,
            payload: error.response?.data?.error
        })
        toast.error(error.response?.data?.error);

    }
}


// single COMPANY action
export const companyLoadSingleAction = (id) => async (dispatch) => {
    dispatch({ type: COMPANY_LOAD_SINGLE_REQUEST });
    const url = `/api/company/${id}`
    try {
        const {data} = await axios.get(url);
        console.log("data",data)
        dispatch({
            type: COMPANY_LOAD_SINGLE_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: COMPANY_LOAD_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}

//delete action
export const deleteCompanyAction = (id) => async (dispatch) => {
    dispatch({ type: DELETE_COMPANY_REQUEST });

    try {
        console.log("in the try")
        // Make a DELETE request to the API to delete the COMPANY type
      const {data} = await axios.delete(`/api/company/delete/${id}`);

        dispatch({ type: DELETE_COMPANY_SUCCESS, payload: data });
        toast.success('Company deleted successfully');
        dispatch(companyLoadAction())

    } catch (error) {
        console.log("in the catch")
        dispatch({
            type: DELETE_COMPANY_FAIL,
            payload: error.response?.data?.error || 'Something went wrong during deletion'
        });
        toast.error(error.response?.data?.error || 'Something went wrong during deletion');
    }
};

//UpdateById
export const companyUpdateAction = (id,updatedCompanyData) => async (dispatch) => {
    dispatch({ type: UPDATE_COMPANY_REQUEST });
    const url = `/api/company/update/${id}`
    try {
        const { data } = await axios.put(url, updatedCompanyData);
        console.log("data",data)
        dispatch({
            type: UPDATE_COMPANY_SUCCESS,
            payload: data
        });
        toast.success("Successfully Updated")
        dispatch(companyLoadAction())

    } catch (error) {
        dispatch({
            type: UPDATE_COMPANY_FAIL,
            payload: error.response.data.error
        });
    }
}
