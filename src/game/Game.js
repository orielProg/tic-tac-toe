import {
  ButtonGroup,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { Fragment, useCallback, useEffect } from "react";
import { Box } from "@mui/system";
import circle from "../circle.png";
import crossmark from "../cross-mark.png";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../store/game";
import "./Game.css";
import { computerMove } from "./game_utils";
import { styled } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import ComputerIcon from "@mui/icons-material/Computer";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import TemplateBox from "../layout/TemplateBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";
import {
  addWinToUser,
  getUsernameByEmail,
  addTieToUser,
  addLoseToUser,
  getUsernameByUid,
} from "../components/auth/firebase";

const firstGroup = [0, 1, 2],
  secondGroup = [3, 4, 5],
  thirdGroup = [6, 7, 8];

const TextDiv = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  padding: theme.spacing(1),
}));

const Game = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const turn = useSelector((state) => state.game.turn);
  const status = useSelector((state) => state.game.gameStatus);
  const gameBoard = useSelector((state) => state.game.gameTable);
  const winMarks = useSelector((state) => state.game.winMarks);
  const uid = props.loginState;

  const resetGame = () => {
    dispatch(gameActions.resetGame({}));
  };

  const goBack = () => {
    resetGame();
    history.push("/menu");
  };

  const makeMark = useCallback(
    (event) => {
      let index;
      if (event && event.target && (event.target.id === "" || turn === "o")) {
        return;
      } else if (event && event.target && event.target.id) {
        index = event.target.id;
      } else {
        index = event;
      }
      if (status !== "on") {
        return;
      }
      dispatch(gameActions.mark({ place: index }));
    },
    [status, dispatch, turn]
  );

  useEffect(() => {
    if (status === "on" && turn === "o") {
      setTimeout(() => {
        const index = computerMove(gameBoard);
        makeMark(index);
      }, 700);
    }
  }, [status, turn, makeMark, gameBoard]);

  let text_and_icon;
  let winMarkOnBoard;

  if (status === "x") {
    text_and_icon = { text: "YOU HAVE WON!", icon: <PersonIcon /> };
    addWinToUser(uid);
  } else if (status === "o") {
    text_and_icon = { text: "COMPUTER HAS WON", icon: <ComputerIcon /> };
    addLoseToUser(uid);
  } else if (status === "tie") {
    text_and_icon = { text: "TIE!", icon: <VideogameAssetIcon /> };
    addTieToUser(uid);
  } else {
    text_and_icon =
      turn === "x"
        ? { text: "Player's Turn", icon: <PersonIcon /> }
        : { text: "Computer's Turn", icon: <ComputerIcon /> };
  }

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
      <TemplateBox>
        <Avatar sx={{ bgcolor: "blue" }}>{text_and_icon.icon}</Avatar>
        <Typography>
          <TextDiv>{text_and_icon.text}</TextDiv>
        </Typography>
        {status !== "on" && (
          <Button type="click" variant="contained" onClick={resetGame}>
            Play again
          </Button>
        )}
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {gameBoard.map((item, index) => {
            if (firstGroup.includes(index)) {
              winMarkOnBoard = winMarks.includes(index)
                ? { variant: "contained", color: "error" }
                : { variant: "", color: "" };
              return (
                <Button
                  style={{ width: 150, height: 150 }}
                  variant={winMarkOnBoard.variant}
                  color={winMarkOnBoard.color}
                  id={index}
                  key={index}
                  onClick={makeMark}
                >
                  {item === "x" && (
                    <img className="photo" alt="crossmark" src={crossmark} />
                  )}
                  {item === "o" && (
                    <img className="photo" alt="circle" src={circle} />
                  )}
                </Button>
              );
            }
          })}
        </ButtonGroup>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          {gameBoard.map((item, index) => {
            if (secondGroup.includes(index)) {
              winMarkOnBoard = winMarks.includes(index)
                ? { variant: "contained", color: "error" }
                : { variant: "", color: "" };
              return (
                <Button
                  style={{ width: 150, height: 150 }}
                  variant={winMarkOnBoard.variant}
                  color={winMarkOnBoard.color}
                  id={index}
                  key={index}
                  onClick={makeMark}
                >
                  {item === "x" && (
                    <img className="photo" alt="crossmark" src={crossmark} />
                  )}
                  {item === "o" && (
                    <img className="photo" alt="circle" src={circle} />
                  )}
                </Button>
              );
            }
          })}
        </ButtonGroup>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          size="large"
        >
          {gameBoard.map((item, index) => {
            if (thirdGroup.includes(index)) {
              winMarkOnBoard = winMarks.includes(index)
                ? { variant: "contained", color: "error" }
                : { variant: "", color: "" };
              return (
                <Button
                  style={{ width: 150, height: 150 }}
                  id={index}
                  variant={winMarkOnBoard.variant}
                  color={winMarkOnBoard.color}
                  key={index}
                  onClick={makeMark}
                >
                  {item === "x" && (
                    <img className="photo" alt="crossmark" src={crossmark} />
                  )}
                  {item === "o" && (
                    <img className="photo" alt="circle" src={circle} />
                  )}
                </Button>
              );
            }
          })}
        </ButtonGroup>
      </TemplateBox>
    </Fragment>
  );
};
export default Game;
