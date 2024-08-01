import * as React from "react";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useTheme } from "@emotion/react";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import classes from "./css/Home.module.css";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const CompanyCard = ({
  companyName,
  description,
  companyLogo,
  location,
  jobs,
  id,
}) => {
  // console.log("companyLogo",`http://localhost:8989/uploads/companyLogo/${companyLogo}`);
  const { palette } = useTheme();
  console.log("this is jobs", jobs);
  return (
    <>
      <div className=" col-md-6">
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            marginBottom: 4,
            marginTop: 3,
            border: 1,
            color: palette.primary.oth,
            bgcolor: palette.primary.main,
          }}
          className={classes.item}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="logo" src={companyLogo} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {companyName}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {/* {jobs.title} */}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {description.split(" ").slice(0, 6).join(" ") + "..."}{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ cursor: "pointer" }} variant="body2">
                    <Button
                      disableElevation
                      variant="contained"
                      size="small"
                      className="btnB"
                      startIcon={<InfoIcon />}
                      sx={{ bgcolor: "#2d2d2d" }}
                    >
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "primary.dark",
                          boxShadow: 0,
                        }}
                        to={`/company/${id}`}
                      >
                        Details
                      </Link>
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  <IconButton>
                    <LocationOnIcon
                      sx={{
                        color: palette.secondary.main,
                        fontSize: 18,
                        padding: 0,
                      }}
                    />
                  </IconButton>
                  {location}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>

      {/* <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(1)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} mb={3} my={3} key={index}>
            <Item>
            <Typography variant="body2">
            <img
                class="flex-shrink-0 img-fluid border rounded  mb-2"
                src={companyLogo}
                alt="logo"
                style={{ width: "80px", height: "80px" }}
              />
                      </Typography>
              
              <Typography
                sx={{
                  fontSize: 15,
                  color: palette.secondary.main,
                  fontWeight: 500,
                }}
                gutterBottom
              >
                <IconButton>
                  <LocationOnIcon
                    sx={{ color: palette.secondary.main, fontSize: 18 }}
                  />
                </IconButton>{" "}
                {location}
              </Typography>
              <div class="container">
                <div class="row g-4 text-left" data-aos="fade-up">
                  <div
                    class="col-lg-2 col-sm-6 wow fadeInUp "
                    data-wow-delay="0.1s"
                  >
                    <div>
                      <h6 class="mb-2 text-dark ">{companyName}</h6>

                      <Typography variant="body2">
                        {description.split(" ").slice(0, 20).join(" ") + "..."}
                      </Typography>
                      <p class="mb-2 text-dark">bla</p>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                disableElevation
                variant="contained"
                size="small"
                startIcon={<AddIcon />}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    boxShadow: 0,
                  }}
                  to={`/company/${id}`}
                >
                  More Details
                </Link>
              </Button>
            </Item>
          </Grid>
        ))}
      </Grid> */}
    </>
  );
};

export default CompanyCard;
