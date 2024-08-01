import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogIn from './pages/LogIn';
import UserRoute from './components/UserRoute';
// import UserInfoDashboard from './pages/user/UserInfoDashboard';
import UserDashboard from './pages/user/UserDashboard'
import Layout from './pages/global/Layout';
import { ProSidebarProvider } from 'react-pro-sidebar';
import UserJobsHistory from './pages/user/UserJobsHistory';
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import SingleJob from './pages/SingleJob';
import DashUsers from './pages/admin/DashUsers';
import DashJobs from './pages/admin/DashJobs';
import DashCategory from './pages/admin/DashCategory';
import DashCreateJob from './pages/admin/DashCreateJob';
import DashCreateCategory from './pages/admin/DashCreateCategory';

import { createTheme } from '@mui/material/styles';
import { themeColors } from './theme'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import Company from './pages/Company';
import DashCompanies from './pages/admin/DashCompanies';
import DashCreateCompany from './pages/admin/DashCreateCompany';
import SingleCompany from './pages/SingleCompany';
import Register from './pages/Register';
import DashUpdateJob from './pages/admin/DashUpdateJob';
import DashUpdateCompany from './pages/admin/DashUpdateCompany';
import About from './pages/About';
import Contact from './pages/Contact';

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const DashCompaniesHOC = Layout(DashCompanies);

const DashUpdateJobHOC = Layout(DashUpdateJob);
const DashUpdateCompanyHOC = Layout(DashUpdateCompany);


const DashCategoryHOC = Layout(DashCategory);
const DashCreateCompanyHOC = Layout(DashCreateCompany);

const DashCreateJobHOC = Layout(DashCreateJob);
const DashCreateCategoryHOC = Layout(DashCreateCategory);

function App() {

  const { mode } = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);

  return (
    <>
    <ToastContainer/>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <ProSidebarProvider>
      <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/search/location/:location' element={<Home/>}/>
                  <Route path='/search/:keyword' element={<Home/>}/>
                  <Route path='/about' element={<About/>}/>
                  <Route path='/contact' element={<Contact/>}/>
                  <Route path='/login' element={<LogIn/>}/>
                  <Route path='/register' element={<Register />} />
                  <Route path='/:location' element={<Company />} />
                  <Route path='/companies' element={<Company />} />
                  <Route path='/companies/search/:keyword' element={<Company/>}/>

                  <Route path='/company/:id' element={<SingleCompany />} />
                  <Route path='/job/:id' element={<SingleJob />} />
                  <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
                  <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
                  <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>} />
                  <Route path='/admin/companies' element={<AdminRoute><DashCompaniesHOC /></AdminRoute>} />

                  <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>} />
                  <Route path='/admin/job/create' element={<AdminRoute><DashCreateJobHOC /></AdminRoute>} />
                  <Route path='/admin/company/create' element={<AdminRoute><DashCreateCompanyHOC /></AdminRoute>} />
                  <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />
                  <Route path='/admin/job/edit/:id' element={<AdminRoute><DashUpdateJobHOC /></AdminRoute>} />
                  <Route path='/admin/company/edit/:id' element={<AdminRoute><DashUpdateCompanyHOC /></AdminRoute>} />


                  <Route path="/user/dashboard" element={<UserRoute><UserDashboardHOC/></UserRoute>}/>
                  <Route path='/user/jobs' element={<UserRoute>< UserJobsHistoryHOC /></UserRoute>} />
                  <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC /></UserRoute>} />

                  {/* <Route path='/job/:id' element={<SingleJob/>}/> */}
                  <Route path='*' element={<NotFound/>}/>
              </Routes>
          </BrowserRouter>

      </ProSidebarProvider>
         
    </ThemeProvider>
   
    </>
  );
}

export default App;