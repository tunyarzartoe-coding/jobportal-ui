import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect } from "react";
import "../components/css/SingleJob.css";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { jobLoadSingleAction } from "../redux/actions/jobAction";
import Button from "@mui/material/Button";
import { userApplyJobAction } from "../redux/actions/userAction";
import { useTheme } from "@emotion/react";
import Navbar from "../components/layout/Navbar";
import LoadingBox from "../components/LoadingBox";
import Footer from "../components/layout/Footer";
import Meta from "./Meta";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const SingleJob = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { singleJob, loading } = useSelector((state) => state.singleJob);
  const { id } = useParams();
  useEffect(() => {
    dispatch(jobLoadSingleAction(id));
  }, [id]);

  const applyForAJob = () => {
    dispatch(
      userApplyJobAction({
        title: singleJob && singleJob.title,
        description: singleJob && singleJob.description,
        salary: singleJob && singleJob.salary,
        location: singleJob && singleJob.location,
        jobType:singleJob && singleJob?.jobType,
        company:singleJob && singleJob?.company
      })
    );
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" }); // 'long' gives the full month name

    return `Published On: ${day} ${month} ${year}`;
  };

  return (
    <>
      <Meta title={"j4u -job details"} />

      <Box sx={{ color: palette.primary.oth, bgcolor: palette.primary.main, marginTop: "65px" }}>
        <Navbar />

        <Box sx={{mb:3}}>
          <Container>
              <div class="container py-5 job-details  mb-2">
                <div class="container my-5 pt-5 pb-4">
                  <h1 class="display-3 text-white mb-3 animated slideInDown">
                    Job Detail
                  </h1>
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb text-uppercase">
                      <li class="breadcrumb-item text-dark ">
                        <Link href="#">Home</Link>
                      </li>
                      <li class="breadcrumb-item">
                        <Link href="#">About Us</Link>
                      </li>
                      <li
                        class="breadcrumb-item text-white active"
                        aria-current="page"
                      >
                        Job Detail
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {loading ? (
                <LoadingBox />
              ) : (
                <Card sx={{ color: palette.primary.oth, bgcolor: palette.primary.main, }}>

                <Box sx={{border:1}}>
                <div class="container p-4 wow jobDetails" data-wow-delay="0.1s">
                  <div class="container p-0 ">
                    <div class="row gy-5 gx-4 ">
                      <div class="col-lg-8">
                        <div class="d-flex align-items-center mb-3">
                          <img
                            class="flex-shrink-0 img-fluid border rounded"
                            src={singleJob && singleJob.company.companyLogo}
                            alt="logo"
                            style={{ width: "80px", height: "80px" }}
                          />
                          <div class="text-start ps-4">
                            <h3 class="mb-2">
                              {" "}
                              {singleJob && singleJob.title}
                            </h3>
                            <span class="text-truncate me-3">
                              <IconButton>
                                <LocationOnIcon
                                  sx={{
                                    color: palette.secondary.main,
                                    fontSize: 18,
                                  }}
                                />
                              </IconButton>{" "}
                              {singleJob && singleJob.location}
                            </span>
                            <span class="text-truncate me-3">
                              {singleJob && singleJob.jobType
                                ? singleJob.jobType.jobTypeName
                                : "No category"}{" "}
                            </span>
                            <span class="text-truncate me-0">
                              <IconButton>{<MonetizationOnIcon />}</IconButton>
                              Salary: ${singleJob && singleJob.salary}
                            </span>
                          </div>
                        </div>

                        <div class="">
                          <h4 class="">Job description</h4>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            {/* <h3>Job description:</h3> */}
                            {singleJob && singleJob.description}
                          </Typography>
                          <h4>Qualifications</h4>
                          <p>Skill</p>

                          <Box>
                            <h4 class="card-header">Company Detail</h4>
                            <Typography className="d-flex my-2 mb-0">
                              Name:
                              <p className="mx-3">
                                {singleJob && singleJob.company
                                  ? singleJob.company.companyName
                                  : "no company"}
                              </p>
                            </Typography>
                            <Typography className="d-flex">
                              About:{" "}
                              <p className="mx-3">
                                {singleJob && singleJob.company
                                  ? singleJob.company.description
                                  : "no description"}
                              </p>
                            </Typography>
                          </Box>
                        </div>
                      </div>

                      <div class="container-card bg col-lg-4">
                        <div
                          class="bg-dark text-white card-body rounded my-5 p-4 wow slideInUp"
                          data-wow-delay="0.1s"
                        >
                          <h4 class="mb-4 card-header mb-3">Job Summery</h4>
                          <p>
                            <i class="fa fa-angle-right text-primary me-2"></i>
                            {singleJob && formatDate(singleJob.createdAt)}
                          </p>
                          <p>
                            <i class="fa fa-angle-right text-primary me-2"></i>
                            Vacancy:
                          </p>
                          <p>
                            <i class="fa fa-angle-right text-primary me-2"></i>
                            Job Nature:{" "}
                            {singleJob && singleJob.jobType
                              ? singleJob.jobType.jobTypeName
                              : "No category"}
                          </p>
                          <p>
                            <i class="fa fa-angle-right text-primary me-2"></i>
                            Salary: ${singleJob && singleJob.salary}
                          </p>
                          <p>
                            <i class="fa fa-angle-right text-primary me-2"></i>
                            Location: {singleJob && singleJob.location}
                          </p>
                          <p class="mb-3">
                            <i class="fa fa-angle-right text-primary me-2 mb-4"></i>
                            Date Line:
                          </p>
                          <Link
                            class="viewJobs btn btn-outline-primary py-1 text-white"
                            to=""
                            onClick={applyForAJob}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </Box>
                </Card>

              )}
{/* 
           
              <Box sx={{ flex: 1, p: 2 }}>
                <Card sx={{ p: 2, bgcolor: palette.primary.white }}>
                  <Button
                    onClick={applyForAJob}
                    sx={{ fontSize: "13px", justifyContent: "center" }}
                    variant="contained"
                  >
                    Apply For this Job
                  </Button>
                </Card>
              </Box> */}
          
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default SingleJob;
