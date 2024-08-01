import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  Container,
  ListItemIcon,
  MenuItem,
  MenuList,
  Pagination,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../redux/actions/jobAction";
import { Link, useParams } from "react-router-dom";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Navbar from "../components/layout/Navbar";
import Header from "../components/layout/Header";
import SelectComponent from "../components/SelectComponent";
import CardElement from "../components/CardElement";
import Footer from "../components/layout/Footer";
import LoadingBox from "../components/LoadingBox";
import CompanyLogo from "./CompanyLogo";
import { formatDistanceToNow } from "date-fns";
import Meta from "./Meta";
import About from "./About";

const Home = () => {
  const { jobs, setUniqueLocation, pages, loading } = useSelector(
    (state) => state.loadJobs
  );

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword, location } = useParams();

  const [page, setPage] = useState(1);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  return (
    <>
          <Meta title={"home"} />

      <Box sx={{ color: palette.background.default, minHeight: "100vh" }}>
        <Navbar />
        <Header />
        <Container>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <Box sx={{ flex: 2, p: 2, }}>
              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2,bgcolor: palette.primary.main,border: 1.5,color:palette.primary.oth }}>
                <Box sx={{ pb: 2,borderColor: 'primary.main' }}>
                  <Typography component="h4" sx={{ color: palette.secondary.white, fontWeight: 600 }}>
                    Filter job by category
                  </Typography>
                </Box>
                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />
              </Card>

              <Card sx={{ minWidth: 150, mb: 3, mt: 3, p: 2 ,bgcolor:palette.primary.main,border: 1.5}}>
                <Box sx={{ pb: 2 }}>
                  <Typography component="h4" sx={{ color: palette.secondary.oth, fontWeight: 600 }}>
                    Filter job by location
                  </Typography>
                  <MenuList>
                    {setUniqueLocation &&
                      setUniqueLocation.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                            <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                          </ListItemIcon>
                          <Link to={`/search/location/${location}`} style={{color: palette.primary.oth}}>{location}</Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>
              {loading ? (
                <LoadingBox />
              ) : jobs?.length === 0 ? (
                <Box sx={{ minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' ,color: "#fff",bgcolor:"#003366"}}>
                  <h2>No result found!</h2>
                </Box>
              ) : (
                jobs?.map((job) => {
                  const timeAgo = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });
                  return (
                    <CardElement
                      key={job._id}
                      id={job._id}
                      jobTitle={job.title}
                      logo={job.company?.companyLogo}
                      description={job.description}
                      category={job.jobType ? job.jobType.jobTypeName : "No category"}
                      location={job.location}
                      time={timeAgo}
                    />
                  );
                })
              )}
              <Stack spacing={2}>
                <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
              </Stack>
            </Box>
          </Stack>
        </Container>
              <CompanyLogo />

      </Box>
      <About/>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
