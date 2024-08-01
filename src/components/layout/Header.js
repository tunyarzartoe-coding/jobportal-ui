import { Box, styled } from "@mui/material";
import React from "react";
import headerImage from "../../images/job-bg1.jpg";
import SearchInputEl from "../SearchInputEl";

const Header = () => {
  const StyleHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    minHeight: 400,
    backgroundImage: `url(${headerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: theme.palette.secondary.main,
    
    // backgroundColor:'rgba(0,0,30,0.4)'
  }));
  return (
    <>
      <StyleHeader >
        {/* <h1 style={{color: "#003366"}}>Hello</h1> */}
        <SearchInputEl  />
      </StyleHeader>
    </>
  );
};

export default Header;
