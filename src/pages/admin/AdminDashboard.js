import { Box, Stack, Typography } from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import { Chart } from "react-google-charts";
import { data, options } from "./data/data";
import StatComponent from "../../components/StatComponent";
import ChartComponent from "../../components/ChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BusinessIcon from "@mui/icons-material/Business";

import { allUserAction } from "../../redux/actions/userAction";
import { jobTypeLoadAction } from "../../redux/actions/jobTypeAction";
import { jobLoadAction } from "../../redux/actions/jobAction";
import { companyLoadAction } from "../../redux/actions/companyAction";
import { useTheme } from "@emotion/react";
import Meta from "../Meta";

const AdminDashboard = () => {
  const { palette } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, []);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  useEffect(() => {
    dispatch(allUserAction());
  }, []);
  useEffect(() => {
    dispatch(companyLoadAction());
  }, []);
  const { users } = useSelector((state) => state.allUsers);
  const { jobs } = useSelector((state) => state.loadJobs);
  const { jobType } = useSelector((state) => state.jobTypeAll);
  const { companies } = useSelector((state) => state.loadCompanies);

  // console.log(jobTypes.length)

  return (
    <>
      <Meta title={"admin dashboard"} />

      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={users && users.length}
            icon={
              <SupervisorAccountIcon
                sx={{ color: palette.primary.icon, fontSize: 30 }}
              />
            }
            description={<p className="text-white"> Administrators</p>}
            money=""
          />

          <StatComponent
            value={companies && companies.length}
            icon={
              <BusinessIcon
                sx={{ color: palette.primary.icon, fontSize: 30 }}
              />
            }
            description={<p className="text-white"> Companies</p>}
            money=""
          />
          <StatComponent
            value={jobs && jobs.length}
            icon={
              <WorkIcon sx={{ color: palette.primary.icon, fontSize: 30 }} />
            }
            description={<p className="text-white"> Jobs</p>}
            money=""
          />
          <StatComponent
            value={jobType && jobType.length}
            icon={
              <CategoryIcon
                sx={{ color: palette.primary.icon, fontSize: 30 }}
              />
            }
            description={<p className="text-white"> Jobs Categories</p>}
            money=""
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ mt: 3 }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <ChartComponent>
            <Chart
              chartType="Bar"
              data={data}
              options={options}
              width="100%"
              height="300px"
              legendToggle
            />
          </ChartComponent>
        </Stack>
      </Box>
    </>
  );
};

export default AdminDashboard;
