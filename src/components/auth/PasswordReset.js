import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment, useRef } from "react";
import { useHistory } from "react-router-dom";
import { sendPasswordResetEmail } from "./firebase";

const PasswordReset = (props) => {
  const history = useHistory();
  const emailRef = useRef();

  const goBack = () => {
    history.push("/menu");
  };

  const sendResetEmail = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(email).then((val) => {
      if (val === 1) {
        goBack();
      }
    });
  };

  const Header = (
    <IconButton onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );

  return (
    <Fragment>
      <Box
        sx={{
          flexDirection: "column",
        }}
      >
        {Header}
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            alignItems: "center",
            paddingTop: 3,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Typography variant="h5" sx={{ paddingTop: 1 }}>
            Account recovery
          </Typography>
          <Typography variant="h7" sx={{ paddingTop: 2, paddingBottom: 1 }}>
            Enter an email address where we can send you a verification code
          </Typography>

          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            inputRef={emailRef}
          />
        </Box>
      </Container>

      <Box
        sx={{
          flexDirection: "column",
          alignItems: "right",
          display: "flex",
        }}
      >
        <Button
          variant="contained"
          sx={{ margin: 3, float: "right" }}
          onClick={sendResetEmail}
        >
          Next
        </Button>
      </Box>
    </Fragment>
  );
};

export default PasswordReset;
