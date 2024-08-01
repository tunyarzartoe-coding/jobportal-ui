import { Box, styled } from "@mui/material";
import React from "react";
import headerImage from "../../images/combg.jpg";
import SearchInputEl from "../SearchInputEl";
import SearchCom from "../SearchCom";

const ComHeader = () => {
  const StyleHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    minHeight: 200,
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
        <SearchCom  />
      </StyleHeader>
    </>
  );
};

export default ComHeader;
