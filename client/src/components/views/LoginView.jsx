import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/users";
import ErrorAlert from "../ErrorAlert";
import { loginUser } from "../../helpers/authHelper";
import Copyright from "../Copyright";
import { toast } from "react-toastify";

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.status == "error") {
      toast.error(data.message);
      return;
    }

    if (data.token) {
      loginUser(data);
      navigate("/");
    } else {
      if (data.error) {
        toast.error(data.error);
      } else toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Stack
      alignItems="center"
      className="bg-white p-5 rounded-lg shadow-lg max-w-fit m-auto mt-20"
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Typography color="text.secondary">
        Don't have an account yet?{" "}
        <Link to="/signup" className="text-primary">
          Sign Up
        </Link>
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="w-80">
        <TextField
          label="College Mail ID"
          fullWidth
          margin="normal"
          autoComplete="email"
          required
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />

        <TextField
          label="Password"
          fullWidth
          required
          margin="normal"
          id="password  "
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
        />

        <ErrorAlert error={serverError} />
        <div className="mt-5">
          <button
            type="submit"
            className="bg-primary  text-white w-full py-3 uppercase"
          >
            Login
          </button>
        </div>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Copyright />
      </Box>
    </Stack>
  );
};

export default LoginView;
