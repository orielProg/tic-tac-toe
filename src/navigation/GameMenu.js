import { useHistory } from "react-router-dom";
import TemplateBox from "../layout/TemplateBox";
import { Button, IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Emoji from "a11y-react-emoji";
import { useState } from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Avatar } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";

const GameMenu = (props) => {
  const [settingsPosition, setSettingsPosition] = useState(null);
  const open = Boolean(settingsPosition);
  const history = useHistory();
  const openLeaderboard = () => {
    history.push("/leaderboard");
  }

  const openGame = () => {
    history.push("/");
  }

  const handleClose =() => {
    setSettingsPosition(null);
  }

  const handleClick = (event) => {
    setSettingsPosition(event.currentTarget);
  }

  const logoutHandler = () => {
    console.log("bye");
    props.setLoginState(false);
    history.push("/login");
  }

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
      <MenuItem>
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
    <TemplateBox>
      <Tooltip title="Settings" sx={{ float: "right" }}>
        <IconButton onClick={handleClick} size="small">
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Button
        type="click"
        variant="outlined"
        fullWidth
        sx={{ marginTop: 10 }}
        onClick={openLeaderboard}
      >
        Leaderboard
        <Emoji symbol="🌍" label="world" />
      </Button>
      <Button type="click" variant="outlined" fullWidth onClick = {openGame} sx={{ marginTop: 10 }}>
        Play game
        <Emoji symbol="🎮" label="game" />
      </Button>
      {SettingsMenu}
    </TemplateBox>
  );
};

export default GameMenu;
