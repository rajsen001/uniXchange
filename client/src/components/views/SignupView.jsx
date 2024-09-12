import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";
import { ToastContainer, toast } from "react-toastify";

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function splitEmail(email) {
  // Find the position of the "@" symbol
  var atIndex = email.indexOf("@");

  // Extract the substring after the "@" symbol
  var domain = email.substring(atIndex + 1);

  // Find the position of the first dot (".") after the "@" symbol
  var dotIndex = domain.indexOf(".");

  // If a dot is found, split the email address into username and domain parts
  if (dotIndex !== -1) {
    var username = email.substring(0, atIndex);
    var domainName = domain.substring(0, dotIndex);
    var domainExtension = domain.substring(dotIndex + 1);
    return [domainName, domainExtension];
  } else {
    // If no dot is found after the "@" symbol, return null or handle the error accordingly
    return null;
  }
}

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const username = generateRandomString(6);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [collegeName, setCollegeName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ password: "Passwords do not match" });
    } else {
      setErrors({});
    }

    const errors = validate();
    if (Object.keys(errors).length !== 0) {
      console.log(errors);
      return;
    }

    const [domainName, domainExtension] = splitEmail(email);

    if (domainExtension != "edu") {
      return toast.error("Please enter a valid college email address");
    }

    const formData = {
      username: username,
      password: password,
      email: email,
      college: collegeName,
    };

    const data = await signup(formData);

    if (data.status == "success") {
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCollegeName("");

      return;
    }

    if (data.error) {
      setServerError(data.error);
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (contains(username, " ")) {
      errors.username = "Must contain only valid characters";
    }

    if (!isLength(password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);

    return errors;
  };

  return (
    <Stack
      alignItems="center"
      className="bg-white p-10 rounded-lg shadow-lg max-w-fit m-auto mt-12"
    >
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <Typography color="text.secondary">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="w-80">
        <TextField
          label="College Mail ID"
          fullWidth
          margin="normal"
          autoComplete="email"
          required
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email !== undefined}
          helperText={errors.email}
        />

        <TextField
          label="College Name"
          fullWidth
          margin="normal"
          autoComplete="collegeName"
          required
          id="collegeName"
          name="collegeName"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
        />

        <TextField
          label="Password"
          fullWidth
          required
          margin="normal"
          autoComplete="password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password !== undefined}
          helperText={errors.password}
        />

        <TextField
          label="Confirm Password"
          padding=""
          fullWidth
          required
          margin="normal"
          autoComplete="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.password !== undefined}
          helperText={errors.password}
        />

        <ErrorAlert error={serverError} />
        <div className="mt-5">
          <button
            type="submit"
            className="bg-primary  text-white w-full py-3 uppercase"
          >
            Sign Up
          </button>
        </div>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Copyright />
      </Box>
    </Stack>
  );
};

export default SignupView;
