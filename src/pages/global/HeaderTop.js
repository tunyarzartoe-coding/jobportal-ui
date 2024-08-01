import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { DarkMode, LightMode } from "@mui/icons-material";
import { toggleActionTheme } from "../../redux/actions/themeAction";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { Link} from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const HeaderTop = () => {
  const { collapseSidebar } = useProSidebar();
  const { palette } = useTheme();
  const dispatch = useDispatch();


  const { userInfo } = useSelector((state) => state.signIn);
  console.log("userInfo",userInfo)

  const { user } = useSelector((state) => state.userProfile);
console.log("user",user)

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 0, bgcolor: palette.background.default }}>
        <Toolbar>
          <IconButton
            onClick={() => collapseSidebar()}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            HR APP
          </Typography>

          {userInfo.role === 0 ? (
             <Box
             sx={{
               flexGrow: 1,
               display: { xs: "none", md: "flex" },
               justifyContent: "center",
             }}
           >
                <Button
                sx={{ my: 2, color: palette.primary.nav, display: "block" }}
              >
                <Link to="/" style={{ color: palette.primary.nav, textDecoration: "none" }}>
                  Home
                </Link>
              </Button>
              <Button
                sx={{ my: 2, color: palette.primary.nav, display: "block" }}
              >
                <Link to="/companies" style={{ color: palette.primary.nav, textDecoration: "none" }}>
                  Companies
                </Link>
              </Button>
              <Button
                sx={{ my: 2, color: palette.primary.nav, display: "block" }}
              >
                <Link to="/about" style={{ color: palette.primary.nav, textDecoration: "none" }}>
                  About
                </Link>
              </Button>
              </Box>
              ) : (
                <MenuItem >
                  {/* <Typography
                    style={{
                      textDecoration: "none",
                      color: palette.secondary.main,
                    }}
                    textAlign="center"
                  >
                    Log Out
                  </Typography> */}
                </MenuItem>
              )}

          {/* toggle dark theme */}
          <IconButton
            sx={{ mr: 4 }}
            onClick={() => dispatch(toggleActionTheme())}
          >
            {palette.mode === "light" ? (
              <DarkMode sx={{ color: "#ffffff", fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: "#2d2d2d", fontSize: "25px" }} />
            )}
          </IconButton>

          <Search sx={{mx:3 ,bgcolor:"#003366",color: palette.primary.text,border:1}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: palette.secondary.main,
                    }}
                    to="/"
                  >
                    Main
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: palette.secondary.main,
                    }}
                    to="/user/detail"
                  >
                    User Detail
                  </Link>
                </Typography>
              </MenuItem>
              
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 0, display: { xs: "none", sm: "block" } ,mx:2}}
          >
            {userInfo.lastName}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderTop;
