import {
  COMPANY_LOAD_FAIL,
  COMPANY_LOAD_REQUEST,
  COMPANY_LOAD_RESET,
  COMPANY_LOAD_SINGLE_FAIL,
  COMPANY_LOAD_SINGLE_REQUEST,
  COMPANY_LOAD_SINGLE_RESET,
  COMPANY_LOAD_SINGLE_SUCCESS,
  COMPANY_LOAD_SUCCESS,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  REGISTER_COMPANY_FAIL,
  REGISTER_COMPANY_REQUEST,
  REGISTER_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_RESET,
  UPDATE_COMPANY_SUCCESS,
} from "../constants/companyConstant";

const initialState = {
  company: null,
  loading: false,
  error: null,
  companies:[]
};

export const createCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
      };
    case REGISTER_COMPANY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const loadCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_LOAD_REQUEST:
      return { loading: true };
    case COMPANY_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        page: action.payload.page,
        pages: action.payload.pages,
        count: action.payload.count,
        setUniqueLocation: action.payload.setUniqueLocation,
        companies: action.payload.companies,
      };
    case COMPANY_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPANY_LOAD_RESET:
      return {};
    default:
      return state;
  }
};


// single company reducer
export const singleCompanyReducer = (state = { company: {} }, action) => {
  switch (action.type) {
    case COMPANY_LOAD_SINGLE_REQUEST:
      return { loading: true };
    case COMPANY_LOAD_SINGLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        singleCompany: action.payload.company,
      };
    case COMPANY_LOAD_SINGLE_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_LOAD_SINGLE_RESET:
      return {};
    default:
      return state;
  }
};

//Delete
export const deleteCompanyReducer = (state = { company: [] }, action) => {
  switch (action.type) {
    case DELETE_COMPANY_REQUEST:
      return { loading: true };
    case DELETE_COMPANY_SUCCESS:
      const updatedCompanies = state?.company?.filter(
        (company) => company._id !== action.payload
      );
      return {
        ...state,
        company: updatedCompanies,
      };
    default:
      return state;
  }
};

//Update
export const companyUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COMPANY_REQUEST:
      return { loading: true };
    case UPDATE_COMPANY_SUCCESS:
      return { loading: false, success: true, COMPANY: action.payload };
    case UPDATE_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COMPANY_RESET:
      return {};
    default:
      return state;
  }
};