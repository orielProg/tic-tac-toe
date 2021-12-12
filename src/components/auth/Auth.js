import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import { Avatar, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { getArrayOfUsers, getUsernameByEmail, signInWithEmailAndPassword } from "./firebase.js";
import { rows } from "../../game/Leaderboard.js";

const Auth = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    signInWithEmailAndPassword(enteredEmail, enteredPassword).then(async (val) => {
      if (val === 1) {
        const username = await getUsernameByEmail(enteredEmail);
        console.log(getArrayOfUsers());
        props.setLoginState(username);
        history.push("/menu");
      }
    });
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
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={submitHandler}
          >
            Sign In
          </Button>
          <Grid container sx={{ marginTop: 2, marginBottom: 6 }}>
            <Grid item xs>
              <Link href = "/recover" variant="body2">Forgot password?</Link>
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
