import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { Box } from "@mui/system";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Container, Link, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useRef,useState } from "react";
import { registerWithEmailAndPassword, signInWithEmailAndPassword } from "./firebase";


const Register = (props) => {
  const [loading,setLoading] = useState(false);
  
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredUsername = usernameRef.current.value;
    registerWithEmailAndPassword(enteredUsername,enteredEmail,enteredPassword).then(async val => {
      setLoading(false);
      if(val===1){
        const uid = await signInWithEmailAndPassword(enteredEmail, enteredPassword);
        if(uid){
          localStorage.setItem("token", uid);
          localStorage.setItem("expirationTime", new Date(new Date().getTime()+60*60*1000).toISOString());
          props.setLoginState(uid);
          history.push("/menu");
        }
      }
    });
  }

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
          Register
        </LoadingButton>
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
