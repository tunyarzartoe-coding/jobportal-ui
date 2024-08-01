import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const { palette } = useTheme();
  return (
    <>
      <Box
        sx={{
          height: "70px",
          bgcolor: "#003366",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: 1,
        }}
      >
        <Box component="span" sx={{ color: palette.primary.text,pb:0 }}>
          All rights reserved! 2023.
        </Box>
      </Box>
    </>
  );
};

export default Footer;
