import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "./components/auth/Auth";
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

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [loginState, setLoginState] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <TemplateCard>
          <Switch>
            {loginState && (
              <Route path="/" exact>
                <Game loginState = {loginState}/>
              </Route>
            )}
            {loginState && (
              <Route path="/leaderboard" exact>
                <Leaderboard/>
              </Route>
            )}
            {loginState && (
              <Route path="/menu" exact>
                <GameMenu setLoginState={setLoginState} />
              </Route>
            )}
            {!loginState && 
              <Route path="/" exact>
                <Redirect to="/login"/>
              </Route>
            }
            {!loginState && 
              <Route path="/menu" exact>
                <Redirect to="/login"/>
              </Route>
            }
            {!loginState && 
              <Route path="/recover" exact>
                <PasswordReset />
              </Route>
            }
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/login" exact>
              <Auth setLoginState={setLoginState} login={loginState} />
            </Route>
          </Switch>
        </TemplateCard>
      </Background>
    </ThemeProvider>
  );
}

export default App;
