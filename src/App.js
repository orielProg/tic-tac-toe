import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "./components/auth/Auth";
import Background from "./layout/Background";
import TemplateCard from "./layout/TemplateCard";
import Register from "./components/auth/Register";
import { Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import Game from "./game/Game";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [loginState, setLoginState] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <TemplateCard>
          <Switch>
            {loginState && (
              <Route path="/" exact>
                <Game />
              </Route>
            )}
            {!loginState && (
              <Route path="/" exact>
                <Redirect to="/login" />
              </Route>
            )}
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/login" exact >
              <Auth setLoginState={setLoginState} login = {loginState}/>
            </Route>
          </Switch>
        </TemplateCard>
      </Background>
    </ThemeProvider>
  );
}

export default App;
