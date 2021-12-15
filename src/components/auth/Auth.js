import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import { Avatar, TextField, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { signInWithEmailAndPassword } from "./firebase.js";
import LoadingButton from "@mui/lab/LoadingButton";

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
    signInWithEmailAndPassword(enteredEmail, enteredPassword).then(
      async (uid) => {
        if (uid) {
          localStorage.setItem("token", uid);
          localStorage.setItem(
            "expirationTime",
            new Date(new Date().getTime() + 60 * 60 * 1000).toISOString()
          );
          setLoading(false);
          props.setLoginState(uid);
          history.push("/menu");
        }
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          alignItems: "center",
          paddingTop: 8,
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
  );
};

export default Auth;
