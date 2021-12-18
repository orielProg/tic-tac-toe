import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Fragment, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth, { retrieveStoredToken } from "./components/auth/Auth";
import PasswordReset from "./components/auth/PasswordReset";
import Register from "./components/auth/Register";
import Game from "./game/Game";
import Leaderboard from "./game/Leaderboard";
import Background from "./layout/Background";
import TemplateCard from "./layout/TemplateCard";
import GameMenu from "./navigation/GameMenu";
import UpdateProfile from "./update/UpdateProfile";

function App() {
  const [loginState, setLoginState] = useState(null);
  const [themeMode,setThemeMode] = useState("light");
  const tokenDetails = retrieveStoredToken();
  const storedMode = localStorage.getItem("mode");
  if(storedMode && storedMode!==themeMode){
    setThemeMode(storedMode);
  }

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const changeMode = () => {
    const mode = storedMode === "light" ? "dark" : "light";
    localStorage.setItem("mode", mode);
    setThemeMode(mode);
  };


  if (!loginState && tokenDetails) {
    setLoginState(tokenDetails.token);
  }

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <TemplateCard>
          <Switch>
            {loginState && (
              <Fragment>
              <Route path="/" exact>
                  <Redirect to="/menu" />
                </Route>
                <Route path="/game" exact>
                  <Game loginState={loginState} />
                </Route>
                <Route path="/leaderboard" exact>
                  <Leaderboard />
                </Route>
                <Route path="/menu" exact>
                  <GameMenu setLoginState={setLoginState} themeMode = {themeMode} changeMode = {changeMode}/>
                </Route>
                <Route path="/update" exact>
                  <UpdateProfile
                    setLoginState={setLoginState}
                    login={loginState}
                  />
                </Route>
              </Fragment>
            )}
            {!loginState && (
              <Fragment>
                <Route path="/login" exact>
                  <Auth setLoginState={setLoginState} themeMode = {themeMode} changeMode = {changeMode}/>
                </Route>
                <Route path="/" exact>
                  <Redirect to="/login" />
                </Route>
                <Route path="/menu" exact>
                  <Redirect to="/login" />
                </Route>
                <Route path="/recover" exact>
                  <PasswordReset />
                </Route>
                <Route path="/register" exact>
                  <Register setLoginState={setLoginState} />
                </Route>
              </Fragment>
            )}
          </Switch>
        </TemplateCard>
      </Background>
    </ThemeProvider>
  );
}

export default App;
