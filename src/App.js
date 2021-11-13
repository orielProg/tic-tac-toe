import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "./components/auth/Auth";
import Background from "./layout/Background";
import TemplateCard from "./layout/TemplateCard";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Background>
        <TemplateCard>
          <Auth />
        </TemplateCard>
      </Background>
    </ThemeProvider>
  );
}

export default App;
