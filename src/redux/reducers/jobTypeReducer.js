import {
  CREATE_JOB_TYPE_FAIL,
  CREATE_JOB_TYPE_REQUEST,
  CREATE_JOB_TYPE_RESET,
  CREATE_JOB_TYPE_SUCCESS,
  DELETE_JOB_TYPE_REQUEST,
  DELETE_JOB_TYPE_SUCCESS,
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_RESET,
  JOB_TYPE_LOAD_SUCCESS,
  UPDATE_JOB_TYPE_FAIL,
  UPDATE_JOB_TYPE_REQUEST,
  UPDATE_JOB_TYPE_RESET,
  UPDATE_JOB_TYPE_SUCCESS,
} from "../constants/jobTypeConstant";

 let initialState = []

 
// load job type reducer
export const loadJobTypeReducer = (state =initialState= { jobType: [] }, action) => {
  switch (action.type) {
      case JOB_TYPE_LOAD_REQUEST:
          return { loading: true }
      case JOB_TYPE_LOAD_SUCCESS:
          return {
              loading: false,
              jobType: action.payload.jobT
          }
      case JOB_TYPE_LOAD_FAIL:
          return {
              loading: false,
              error: action.payload
          }
      case JOB_TYPE_LOAD_RESET:
          return {}
      default:
          return state;
  }
}

// create job type reducer
export const createJobTypeReducer = (state =initialState= {}, action) => {
  switch (action.type) {
      case CREATE_JOB_TYPE_REQUEST:
          return { loading: true }
      case CREATE_JOB_TYPE_SUCCESS:
          return {
              loading: false,
              jobType: action.payload,
          }
      case CREATE_JOB_TYPE_FAIL:
          return { loading: false, error: action.payload }
      case CREATE_JOB_TYPE_RESET:
          return {}
      default:
          return state;
  }

}
//Delete
export const deleteJobTypeReducer = (state =initialState= { jobType: [] }, action) => {
  switch (action.type) {
    case DELETE_JOB_TYPE_REQUEST:
      return { loading: true };
    case DELETE_JOB_TYPE_SUCCESS:
      const updatedJobTypes = state?.jobType?.filter(
        (jobType) => jobType._id !== action.payload
      );
      return {
        ...state,
        jobType: updatedJobTypes,
      };
    default:
      return state;
  }
};
//Update
export const jobTypeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_JOB_TYPE_REQUEST:
      return { loading: true };
    case UPDATE_JOB_TYPE_SUCCESS:
      return { loading: false, success: true, jobType: action.payload };
    case UPDATE_JOB_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_JOB_TYPE_RESET:
      return {};
    default:
      return state;
  }
};