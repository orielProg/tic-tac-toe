import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LockIcon from "@mui/icons-material/Lock";
import LoadingButton from "@mui/lab/LoadingButton";
import { Avatar, Grid, IconButton, Link, TextField, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { signInWithEmailAndPassword } from "./firebase.js";

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const Auth = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const tokenDetails = retrieveStoredToken();

  if (tokenDetails) {
    props.setLoginState(tokenDetails.token);
    history.push("/menu");
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    signInWithEmailAndPassword(enteredEmail, enteredPassword).then((uid) => {
      setLoading(false);
      if (uid) {
        localStorage.setItem("token", uid);
        localStorage.setItem(
          "expirationTime",
          new Date(new Date().getTime() + 60 * 60 * 1000).toISOString()
        );
        props.setLoginState(uid);
        history.push("/menu");
      }
    });
  };

  return (
    <Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <IconButton onClick={props.changeMode}>
            {props.themeMode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            alignItems: "center",
            paddingTop: 5,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Avatar sx={{ bgcolor: "blue" }}>
            <LockIcon />
          </Avatar>
          <Typography variant="h5" sx={{ paddingTop: 1 }}>
            Sign In
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              inputRef={emailRef}
            />
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id="password"
              label="Password"
              inputRef={passwordRef}
            />
            <LoadingButton
              onClick={submitHandler}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Sign In
            </LoadingButton>
            <Grid container sx={{ marginTop: 2, marginBottom: 6 }}>
              <Grid item xs>
                <Link href="/recover" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default Auth;
