import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useState } from "react";
import Logo from "../components/logo";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { logoStyle, textFieldStyle, linkStyle } from "../styles/registerStyle";
import useAuthCall from "../hooks/useAuthCall";
import { toast } from "react-hot-toast";
import loadingGif from "../assets/loading.gif";

const Register = () => {
  const { register } = useAuthCall();
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const customErrorStyle = {
    backgroundColor: "#FCD8DC",
    color: "#A94442",
    textAlign: "center",
    borderRadius: "8px",
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitFunc = async () => {
    setLoading(true);
    try {
      await register(info);
    } catch {
      console.log("Registiration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (info.password.length < 8) {
      toast.error("Password must be at least 8 characters.", {
        style: customErrorStyle,
      });
      return;
    }

    submitFunc();
  };

  const frameStyle = {
    filter: loading ? "blur(5px)" : "blur(0px)",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  };

  return (
    <Box
      sx={{
        height: "100vh",
        color: "white",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        borderWidth: loading ? 0 : "0 4px 0 0",
        borderStyle: loading ? "none" : "solid",
        borderColor: loading ? "none" : "white",
        borderTopRightRadius: loading ? 0 : "1rem",
        overflow: "hidden",
        ...(loading
          ? {}
          : {
              "&::after": {
                content: '""',
                width: "2px",
                position: "fixed",
                right: { xs: "1rem", md: "10rem", xl: "15rem" },
                height: "100%",
                background:
                  "linear-gradient(to bottom, #bfc2c5 0%, #e0f4ff 50%,#adddff)",
                animation: "shine 4s infinite",
                borderRadius: "0 1rem 1rem 0",
                boxShadow: "0 0 4px #c3deeb",
              },
              "@keyframes shine": {
                "0%": { transform: "translateY(-100%)" },
                "100%": { transform: "translateY(100%)" },
              },
            }),
      }}
    >
      {loading && (
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            zIndex: 3,
          }}
        >
          <img
            src={loadingGif}
            alt="loading"
            style={{ width: "5rem", position: "absolute", top: "50%" }}
          />
        </Box>
      )}

      <Box sx={frameStyle}>
        <Box sx={logoStyle}>
          <Link to="/" disabled={loading}>
            <Logo />
          </Link>
        </Box>

        <Typography
          sx={{ color: "#494b56", fontSize: "1.2rem", fontWeight: 580 }}
        >
          LET'S GET STARTED
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            disabled={loading}
            name="name"
            required
            fullWidth
            id="name"
            placeholder="NAME *"
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <TextField
            disabled={loading}
            name="email"
            type="email"
            required
            fullWidth
            id="email"
            placeholder="EMAIL ADDRESS *"
            onChange={handleChange}
            sx={textFieldStyle}
          />

          <Box sx={{ minHeight: "6rem" }}>
            <TextField
              disabled={loading}
              name="password"
              required
              type={showPassword ? "text" : "password"}
              fullWidth
              id="password"
              placeholder="PASSWORD *"
              value={info.password}
              onChange={handleChange}
              sx={textFieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {info.password && (
              <Box sx={{ width: "20rem", pl: "1rem" }}>
                <Typography
                  sx={{
                    color: info.password.length < 8 ? "red" : "green",
                    textAlign: "start",
                    fontSize: "0.7rem",
                  }}
                >
                  * At least 8 characters long.
                </Typography>
              </Box>
            )}
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              mt: 4,
              mb: 5,
              backgroundColor: "#F2F2F2",
              color: "#494b56",
              borderRadius: "0.7rem",
              width: "8rem",
              transition: "0.4s",
              "&:hover": { backgroundColor: "#000", color: "white" },
            }}
          >
            SUBMIT
          </Button>
        </Box>

        <Link style={linkStyle}>
          Already a member?{" "}
          <Link
            to={loading ? "/forgotpass" : "/login"}
            style={{ textDecoration: "underline", color: "#044985" }}
          >
            Login Here
          </Link>
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
