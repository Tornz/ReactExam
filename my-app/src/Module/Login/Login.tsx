import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { login } from "../../Store/Reducer/User/userSlice";
import classes from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated: Boolean = useSelector(
    (state: any) => state.userContext.isAuthenticated
  );
  const [branchId, setBranchId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [isTriggerEvent, setIsTriggerEvent] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    setIsTriggerEvent(true);
    event.preventDefault();
    dispatch(login({ username, password, branchId }));
  };

  const checkAuthentication = () => {
    debugger;
    if (!isAuthenticated && isTriggerEvent) {
      return false;
    } else if (isAuthenticated && isTriggerEvent) {
      navigate("/user");
    } else {
      return true;
    }
  };

  return (
    <div className={classes.divAlign}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
        className={classes.boxWidth}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Branch Id"
          variant="outlined"
          value={branchId}
          onChange={(e) => setBranchId(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.width100}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        {!checkAuthentication() && (
          <div className={classes.padB10}>
            <Alert severity="error">Error Password is incorrect.</Alert>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Login;
