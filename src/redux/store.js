import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { jobByCompanyIdReducer, jobUpdateReducer, loadJobReducer, loadJobSingleReducer, registerAjobReducer } from './reducers/jobReducer';
import { createJobTypeReducer, deleteJobTypeReducer, jobTypeUpdateReducer, loadJobTypeReducer } from './reducers/jobTypeReducer';
import { allUserReducer, userApplyJobReducer, userReducerLogout, userReducerProfile, userReducerSignIn } from './reducers/userReducer';
import { modeReducer } from './reducers/themeModeReducer';
import { companyUpdateReducer, createCompanyReducer, deleteCompanyReducer, loadCompanyReducer, singleCompanyReducer } from './reducers/companyReducer';

//combine reducers
const reducer = combineReducers({
    loadJobs: loadJobReducer,
    loadCompanies:loadCompanyReducer,
    jobTypeAll: loadJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    mode: modeReducer,
    userProfile:userReducerProfile,
    singleCompany:singleCompanyReducer,
    singleJob:loadJobSingleReducer,
    jobByCompanyId:jobByCompanyIdReducer,
    userJobApplication:userApplyJobReducer,
    allUsers:allUserReducer,
    registerJob: registerAjobReducer,
    createJobType: createJobTypeReducer,
    deleteJobType: deleteJobTypeReducer,
    createCompany:createCompanyReducer,
    deleteCompany:deleteCompanyReducer,
    jobUpdate:jobUpdateReducer,
    companyUpadte:companyUpdateReducer,
    jobTypeUpdate:jobTypeUpdateReducer

});


//initial state
//initial state
let initialState = {
    signIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    },
    mode: {
        mode: "light"
    }
};const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;