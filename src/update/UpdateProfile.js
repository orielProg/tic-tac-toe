import { useHistory } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Fragment, useState, useRef } from "react";
import { Container } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import ScoreIcon from "@mui/icons-material/Score";
import {
  changeEmailOrPassword,
  changeUsernameByUid,
  resetScore,
} from "../components/auth/firebase";

const UpdateProfile = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [updateData, setUpdateData] = useState(null);
  const firstRef = useRef();
  const passwordRef = useRef();
  const uid = props.login;

  const updateEmail = () => {
    setUpdateData("email");
  };

  const updateUsername = () => {
    setUpdateData("username");
    console.log("username");
  };

  const updatePassword = () => {
    setUpdateData("password");
  };

  const updateScore = () => {
    setUpdateData("score");
  };
  const goBackFromMenu = () => {
    history.push("/menu");
  };
  const goBackFromUpdate = () => {
    setUpdateData(null);
  };

  const change = async (event) => {
    event.preventDefault();
    setLoading(true);
    var msg, result;
    if (event.target.id === "Change Email") {
      result = await changeEmailOrPassword(
        uid,
        passwordRef.current.value,
        firstRef.current.value,
        "email"
      );
      if (result === 1) {
        msg = "Email changed successfully";
      }
    } else if (event.target.id === "Change Password") {
      result = await changeEmailOrPassword(
        uid,
        passwordRef.current.value,
        firstRef.current.value,
        "password"
      );
      if (result === 1) {
        msg = "Password changed successfully";
      }
    } else if (event.target.id === "Change Username") {
      result = await changeUsernameByUid(
        uid,
        passwordRef.current.value,
        firstRef.current.value
      );
      if (result === 1) {
        msg = "Username changed successfully";
      }
    } else {
      result = await resetScore(uid, passwordRef.current.value);
      if (result === 1) {
        msg = "Score reset successfully";
      }
    }
    setLoading(false);
    if (result === 1) {
      alert(msg);
      goBackFromUpdate();
    }
  };

  let goBack = updateData ? goBackFromUpdate : goBackFromMenu;
  let upperPassword = updateData === "password" ? "password" : "";

  let componentDetails = {
    avatar_icon: <EmailIcon />,
    text: "Change Email",
    id1: "email",
    id2: "password",
    label1: "New email",
    label2: "Account password",
    button: "Change Email",
  };

  if (updateData === "username") {
    componentDetails = {
      avatar_icon: <PersonIcon />,
      text: "Change Username",
      id1: "username",
      id2: "password",
      label1: "New username",
      label2: "Account password",
      button: "Change Username",
    };
  } else if (updateData === "password") {
    componentDetails = {
      avatar_icon: <PasswordIcon />,
      text: "Change Password",
      id1: "password",
      id2: "new password",
      label1: "Old password",
      label2: "New password",
      button: "Change Password",
    };
  } else if (updateData === "score") {
    componentDetails = {
      avatar_icon: <ScoreIcon />,
      text: "Reset Score",
      id1: "email",
      id2: "password",
      label1: "Account email",
      label2: "Account password",
      button: "Reset Score",
    };
  }

  const Header = (
    <Box
      sx={{
        flexDirection: "column",
      }}
    >
      <IconButton onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );

  const MainMenu = (
    <Fragment>
      {Header}
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Button
            onClick={updateEmail}
            type="click"
            variant="outlined"
            sx={{
              float: "center",
              height: 80,
              margin: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Change email
          </Button>
          <Button
            type="click"
            onClick={updatePassword}
            variant="outlined"
            sx={{
              float: "center",
              height: 80,
              margin: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Change password
          </Button>
          <Button
            onClick={updateUsername}
            type="click"
            variant="outlined"
            sx={{
              float: "center",
              height: 80,
              margin: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Change username
          </Button>
          <Button
            onClick={updateScore}
            type="click"
            variant="outlined"
            sx={{
              float: "center",
              height: 80,
              margin: 2,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            Reset score
          </Button>
        </Box>
      </Container>
    </Fragment>
  );

  const updateComponent = (
    <Fragment>
      {Header}
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
            {componentDetails.avatar_icon}
          </Avatar>
          <Typography variant="h5" sx={{ paddingTop: 1 }}>
            {componentDetails.text}
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              fullWidth
              type={upperPassword}
              id={componentDetails.id1}
              label={componentDetails.label1}
              inputRef={firstRef}
            />
            <TextField
              margin="normal"
              fullWidth
              type="password"
              id={componentDetails.id2}
              label={componentDetails.label2}
              inputRef={passwordRef}
            />
            <LoadingButton
              id={componentDetails.text}
              onClick={change}
              sx={{ marginTop: 3, marginBottom: 5 }}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              fullWidth
            >
              {componentDetails.button}
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </Fragment>
  );

  if (!updateData) {
    return MainMenu;
  }
  return updateComponent;
};

export default UpdateProfile;
