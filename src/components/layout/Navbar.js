import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WorkIcon from "@mui/icons-material/Work";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../redux/actions/userAction";
import { toggleActionTheme } from "../../redux/actions/themeAction";
import { DarkMode, LightMode } from "@mui/icons-material";

const pages = ["Home", "Log In", "About", "Companies", "Contact"];

function Navbar() {
  //show / hide button
  const { userInfo } = useSelector((state) => state.signIn);
  console.log("userInfo",userInfo)
  // console.log("Username",userInfo.lastName)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // log out user
  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <AppBar position="fixed" sx={{color: palette.dark,bgcolor: "primary.main"}}>
      <Container >
        {/* principal Menu */}
        <Toolbar disableGutters>
          <WorkIcon
            sx={{
              display: { xs: "none", md: "flex" },
              color: "secondary.main",
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "secondary.#53B982",
              textDecoration: "none",
            }}
          >
            J4U
          </Typography>

          <Box  sx={{ flexGrow: 1,display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="info"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ 
                display: { xs: "block", md: "none" ,color:palette.primary.text},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" className="text-info">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WorkIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".09rem",
              color: "#53B982",
              textDecoration: "none",
            }}
          >
            J4U
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {/* menu desktop */}

            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: palette.primary.nav, display: "block" }}
            >
              <Link to="/" style={{ color: palette.primary.nav, textDecoration: "none" }}>
                Home
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: palette.primary.nav, display: "block" }}
            >
              <Link
                to="/about"
                style={{ color: palette.primary.nav, textDecoration: "none" }}
              >
                About
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: palette.primary.nav, display: "block" }}
            >
              <Link
                to="/companies"
                style={{ color: palette.primary.nav, textDecoration: "none" }}
              >
                Companies
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: palette.primary.nav, display: "block" }}
            >
              <Link
                to="/contact"
                style={{ color: palette.primary.nav, textDecoration: "none" }}
              >
                Contact
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: palette.primary.nav, display: "block" }}
            >
              <Link
                to="/register"
                style={{ color: palette.primary.nav, textDecoration: "none" }}
              >
                SignIn
              </Link>
            </Button>
          </Box>
          <IconButton sx={{ mr: 4 }} onClick={() => dispatch(toggleActionTheme())}>
                        {palette.mode === "light" ? (
                            <DarkMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: "#2d2d2d", fontSize: "25px" }} />
                        )}
                    </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                    to="/admin/dashboard"
                  >
                    Admin Dashboard
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
                    to="/user/dashboard"
                  >
                    User Dashboard
                  </Link>
                </Typography>
              </MenuItem>
            
              {!userInfo ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: palette.secondary.main,
                      }}
                      to="/login"
                    >
                      Log In
                    </Link>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={logOutUser}>
                  <Typography
                    style={{
                      textDecoration: "none",
                      color: palette.secondary.main,
                    }}
                    textAlign="center"
                  >
                    Log Out
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
