import { useHistory } from "react-router-dom";
import TemplateBox from "../../layout/TemplateBox";
import { Typography } from "@mui/material";
import { Fragment, useRef } from "react";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

const PasswordReset = (props) => {
  const history = useHistory();
  const emailRef = useRef();

  const goBack = () => {
    history.push("/menu");
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
            paddingTop: 5,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Typography variant="h5" sx={{ paddingTop: 1 }}>
            Account recovery
          </Typography>
          <Typography variant="h7" sx={{ paddingTop: 2 }}>
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
          alignContent : "right"
        }}
      >
      <Button variant="contained" color="success">
      Next
    </Button>
      </Box>
    </Fragment>
  );
};

export default PasswordReset;
