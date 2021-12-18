import { Logout } from "@mui/icons-material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Button, Container, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import Emoji from "a11y-react-emoji";
import { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

const GameMenu = (props) => {
  const [settingsPosition, setSettingsPosition] = useState(null);
  const open = Boolean(settingsPosition);
  const history = useHistory();

  const currentMode =
    props.themeMode === "light"
      ? { msg: "Dark mode : Off", icon: <Brightness7Icon sx = {{marginRight : 1 }}/> }
      : { msg: "Dark mode : On", icon: <Brightness4Icon sx = {{marginRight : 1 }}/> };

  const openLeaderboard = () => {
    history.push("/leaderboard");
  };

  const openGame = () => {
    history.push("/game");
  };

  const openUpdateProfile = () => {
    history.push("/update");
  };

  const handleClose = () => {
    setSettingsPosition(null);
  };

  const handleClick = (event) => {
    setSettingsPosition(event.currentTarget);
  };

  const logoutHandler = () => {
    console.log("bye");
    props.setLoginState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    history.push("/login");
  };

  const SettingsMenu = (
    <Menu
      anchorEl={settingsPosition}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={props.changeMode}>{currentMode.icon}{currentMode.msg}</MenuItem>
      <MenuItem onClick={openUpdateProfile}>
        <Avatar />
        Update profile
      </MenuItem>
      <MenuItem onClick={logoutHandler}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <Box
        sx={{
          flexDirection: "column",
        }}
      >
        <Tooltip title="Settings" sx={{ float: "right" }}>
          <IconButton onClick={handleClick} size="small">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            alignItems: "center",
            padding: 10,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <Button
            type="click"
            variant="outlined"
            onClick={openGame}
            sx={{ float: "center", height: 80, margin: 2 }}
          >
            New Game
            <Emoji symbol="🎮" label="game" />
          </Button>
          <Button
            type="click"
            variant="outlined"
            sx={{ float: "center", height: 80, margin: 2 }}
            onClick={openLeaderboard}
          >
            Leaderboard
            <Emoji symbol="🌍" label="world" />
          </Button>
          <Button
            type="click"
            variant="outlined"
            sx={{ float: "center", height: 80, margin: 2 }}
            onClick={logoutHandler}
          >
            Logout
            <Emoji symbol="🚪" label="exit" />
          </Button>
          {SettingsMenu}
        </Box>
      </Container>
    </Fragment>
  );
};

export default GameMenu;
