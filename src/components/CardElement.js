import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import classes from "../../src/components/css/Home.module.css";

const CardElement = ({
  jobTitle,
  description,
  category,
  location,
  id,
  logo,
  time,
}) => {
  console.log(time);
  console.log("logo", logo);
  console.log("category ", category);
  const { palette } = useTheme();
  return (
    <Card
      sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor:palette.primary.main,color:palette.primary.oth, border: 1.5 }}
      className={classes.item}
    >
      <CardContent>
        <Grid container >
          <Grid item xs={2}>
            <Typography variant="h5" component="div">
              <img
                class="flex-shrink-0 img-fluid border rounded"
                src={logo}
                alt=""
                style={{ width: "80px", height: "80px" }}
              />
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h5" component="div">
              {jobTitle}
            </Typography>
            <Typography sx={{ mb: 1.5, display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                Job Type :
              </Typography>
              {category}
            </Typography>

            <Typography variant="body2">
              {description
                ? description.split(" ").slice(0, 15).join(" ") + "..."
                : "No description available"}
            </Typography>

            {/* <Typography variant="body2"> */}
            {/* Description:{" "} */}
            {/* Description: {description.split(" ").slice(0, 15).join(" ") + "..."} */}

            {/* {description && description.length > 90
                ? description.substring(0, 90) + "..."
                : description} */}
            {/* </Typography> */}
          </Grid>

          <Grid item xs={3}>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 500,
              }}
              gutterBottom
            >
              <IconButton>
                <LocationOnIcon sx={{ color: "#eee", fontSize: 18 }} />
              </IconButton>{" "}
              {location}
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={6} sx={{ mt: 2 }}>
            <Button
              disableElevation
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              className="btnB"
              sx={{bgcolor:"#2d2d2d"}}
              >
              <Link
                style={{
                  textDecoration: "none",
                  boxShadow: 0,
                }}
                to={`/job/${id}`}
              >
                More Details
              </Link>
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ mt: 2 }}>
            <Typography>Posted: {time}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardElement;
