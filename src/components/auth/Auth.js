import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import { Avatar, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";

const Auth = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          alignItems: "center",
          paddingTop: 8,
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Avatar sx={{ bgcolor: "blue" }}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" sx={{ paddingTop: 1 }}>
          Sign In
        </Typography>
        <Box component="form">
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
          />
          <TextField margin="normal" fullWidth id="password" label="Password" />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Sign In
          </Button>
          <Grid container sx= {{marginTop: 2}}>
            <Grid item xs>
              <Link href="/hi" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/hi" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Auth;
