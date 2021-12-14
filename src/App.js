import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth, { retrieveStoredToken } from "./components/auth/Auth";
import Background from "./layout/Background";
import TemplateCard from "./layout/TemplateCard";
import Register from "./components/auth/Register";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import Game from "./game/Game";
import GameMenu from "./navigation/GameMenu";
import { Fragment } from "react";
import Leaderboard from "./game/Leaderboard";
import PasswordReset from "./components/auth/PasswordReset";
import UpdateProfile from "./update/UpdateProfile";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [loginState, setLoginState] = useState(null);
  const tokenDetails = retrieveStoredToken();

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
                  <Game loginState={loginState} />
                </Route>
                <Route path="/leaderboard" exact>
                  <Leaderboard />
                </Route>
                <Route path="/menu" exact>
                  <GameMenu setLoginState={setLoginState} />
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
                  <Auth setLoginState={setLoginState} />
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
