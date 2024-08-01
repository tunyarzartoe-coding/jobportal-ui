import { Link, useParams } from "react-router-dom";
import "../components/css/SingleCompany.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Box, Card, Container } from "@mui/material";
import { Stack } from "react-bootstrap";
import { companyLoadSingleAction } from "../redux/actions/companyAction";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import { jobByCompanyIdAction } from "../redux/actions/jobAction";
import CardElement from "../components/CardElement";
import { formatDistanceToNow } from "date-fns";
import Meta from "./Meta";

const SingleCompany = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { singleCompany, loading } = useSelector(
    (state) => state.singleCompany
  );
  console.log("single company",singleCompany)
  const { jobByCompanyId } = useSelector((state) => state.jobByCompanyId);
  console.log("jobByCompanyId", jobByCompanyId );

  const { id } = useParams();
  useEffect(() => {
    dispatch(companyLoadSingleAction(id));
  }, [id]);
  useEffect(() => {
    dispatch(jobByCompanyIdAction(id));
  }, [id]);

  return (
    <>
      <Meta title={"j4u - company details"} />

      <Box sx={{ color: palette.primary.oth, bgcolor: palette.primary.main,minHeight: "88vh" }}>

        <Navbar />

        <Box sx={{ pt: 0}}>
          <Container >
            {/* <Box sx={{ flex: 4, p:4, color: palette.background.default }}> */}
              <section className="comDeatils my-5 p-0">
                <div class="container py-5 bg-dark company-header ">
                  <div class="container my-5 pt-5 pb-5">
                    <h1 class="display-3 text-white mb-3 animated slideInDown">
                      Company Details
                    </h1>
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb text-uppercase">
                        <li class="breadcrumb-item text-white">
                          <Link href="#">Home</Link>
                        </li>
                        <li class="breadcrumb-item text-white">
                          <Link href="#">Pages</Link>
                        </li>
                        <li
                          class="breadcrumb-item text-white active"
                          aria-current="page"
                        >
                          Company Details
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>

                {loading ? (
                  <LoadingBox />
                ) : (
                  <Box sx={{ color: palette.primary.oth, bgcolor: palette.primary.main }}>
                    <Card
                      sx={{
                        color: palette.primary.oth, bgcolor: palette.primary.main,
                        border: 1,
                      }}
                    >
                      <div
                        class="container-fluid  wow  p-4"
                        data-wow-delay="0.1s"
                      >
                        <div class="container p-0">
                          <div class="row gy-5 gx-4 ">
                            <div class="col-lg-8">
                              <div class="d-flex align-items-center mb-5  ">
                                <img
                                  src={
                                    singleCompany && singleCompany.companyLogo
                                  }
                                  alt=""
                                  style={{ width: "80px", height: "80px" }}
                                />
                                <div class="text-start ps-4">
                                  <h3 class="mb-3">
                                    {singleCompany && singleCompany.companyName}
                                  </h3>
                                  <span class="text-truncate me-3">
                                    <i class="fa fa-map-marker-alt text-primary me-2"></i>
                                    {singleCompany && singleCompany.location}{" "}
                                  </span>
                                </div>
                              </div>
                              <div class="mb-5">
                                <h4 class="mb-3">Description</h4>
                                <p>
                                  {singleCompany && singleCompany.description}
                                </p>
                              </div>
                              <Box sx={{ color: palette.primary.oth, bgcolor: palette.primary.main }}>
                                <div
                                  class="accordion rjob"
                                  id="accordionPanelsStayOpenExample"
                                >
                                  <div class="accordion-item">
                                    <h2
                                      class="accordion-header"
                                      id="panelsStayOpen-headingThree"
                                    >
                                      <button
                                        class="accordion-button collapsed rjob"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#panelsStayOpen-collapseThree"
                                        aria-expanded="false"
                                        aria-controls="panelsStayOpen-collapseThree"
                                      >
                                        Related Jobs
                                      </button>
                                    </h2>
                                    <div
                                      id="panelsStayOpen-collapseThree"
                                      class="accordion-collapse collapse"
                                      aria-labelledby="panelsStayOpen-headingThree"
                                    >
                                      <div
                                        class="accordion-body"
                                        style={{ color: palette.primary.oth, bgcolor: palette.primary.main }}
                                      >
                                        <Container>
                                          <Stack
                                            direction={{
                                              xs: "column",
                                              sm: "row",
                                            }}
                                            spacing={{ xs: 1, sm: 2, md: 4 }}
                                          >
                                            <Box sx={{ flex: 5, p: 2 }}>
                                              {loading ? (
                                                <LoadingBox />
                                              ) : jobByCompanyId &&
                                                jobByCompanyId.length === 0 ? (
                                                <>
                                                  <Box
                                                    sx={{
                                                      minHeight: "350px",
                                                      display: "flex",
                                                      justifyContent: "center",
                                                      alignItems: "center",
                                                    }}
                                                  >
                                                    <h2>No result found!</h2>
                                                  </Box>
                                                </>
                                              ) : (
                                                jobByCompanyId &&
                                                jobByCompanyId.map((job, i) => {
                                                  const timeAgo =
                                                    formatDistanceToNow(
                                                      new Date(job.createdAt),
                                                      { addSuffix: true }
                                                    );
                                                  return (
                                                    <CardElement
                                                      key={i}
                                                      id={job._id}
                                                      logo={
                                                        singleCompany.companyLogo
                                                      }
                                                      jobTitle={job.title}
                                                      description={
                                                        job.description
                                                      }
                                                      category={
                                                        job.jobType
                                                          ? job.jobType
                                                              .jobTypeName
                                                          : "No category"
                                                      }
                                                      location={job.location}
                                                      time={timeAgo}
                                                    />
                                                  );
                                                })
                                              )}
                                              {/* <Stack spacing={2} >
                                <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(event, value) => setPage(value)} />
                            </Stack> */}
                                            </Box>
                                          </Stack>
                                        </Container>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Box>
                            </div>

                            <Card
                              sx={{ color: palette.primary.oth, bgcolor: palette.primary.main }}
                              class="container-card col-lg-4 "
                            >
                              <div
                                class=" rounded  mb-4 wow slideInUp "
                                data-wow-delay="0.1s"
                              >
                               
                                  <h4 class="p-3 text-center ">
                                    Company Summery
                                  </h4>
                                
                                <Card
                                  content
                                  sx={{ color: palette.primary.oth, bgcolor: palette.primary.main}}
                                >
                                  <p>
                                    <i class="fa fa-angle-right  me-2"></i>
                                    Name:{" "}
                                    {singleCompany && singleCompany.companyName}
                                  </p>
                                  <p>
                                    <i class="fa fa-angle-right  me-2"></i>
                                    Phone:{" "}
                                    {singleCompany &&
                                      singleCompany.companyPhone}
                                  </p>
                                  <p>
                                    <i class="fa fa-angle-right  me-2"></i>
                                    Address:{" "}
                                    {singleCompany && singleCompany.location}
                                  </p>
                                  <p>
                                    <i class="fa fa-angle-right text-white me-2"></i>
                                    Email:{" "}
                                    {singleCompany &&
                                      singleCompany.companyEmail}
                                  </p>
                                  <p>
                                    <i class="fa fa-angle-right text-white me-2"></i>
                                    jobs opening:{" "}
                                    {jobByCompanyId &&
                                      jobByCompanyId.length}
                                  </p>
                                </Card>
                              </div>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Box>
                )}
              </section>
            {/* </Box> */}
          </Container>
          
        </Box>
       
      </Box>
      <Footer />
    </>
  );
};

export default SingleCompany;
