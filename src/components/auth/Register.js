import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Container, Link, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useRef } from "react";

const loginUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6pMIrvFal9tedbnYPFNkPoyvYZoPWGv0";
  const setUsernameUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB6pMIrvFal9tedbnYPFNkPoyvYZoPWGv0";



const Register = (props) => {
  
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const insertUsername = (idToken, username) => {
    fetch(setUsernameUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken : idToken,
        displayName : username
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        res.json().then((data) => {
          if (data && data.error && data.error.message) {
            alert(data.error.message);
          }
        });
      }
    }).then((data)=>{
      alert("Successfuly Registered!");
    });
  }

  const submitHandler= async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredUsername = usernameRef.current.value;
    fetch(loginUrl, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        res.json().then((data) => {
          if (data && data.error && data.error.message) {
            alert(data.error.message);
          }
        });
      }
    }).then((data)=>{
      insertUsername(data.idToken, enteredUsername);
      history.push("/login");
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
          <AppRegistrationIcon />
        </Avatar>
        <Typography variant="h5" sx={{ paddingTop: 1 }}>
          Open New Account
        </Typography>
        <Box component="form">
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="User Name"
            inputRef={usernameRef}
          />
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
            Register
          </Button>
          <Grid container sx={{ marginTop: 2, marginBottom: 6 }}>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
