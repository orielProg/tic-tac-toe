import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

const TemplateCard = (props) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Paper>{props.children}</Paper>
      </Grid>
    </Grid>
  );
};

export default TemplateCard;
