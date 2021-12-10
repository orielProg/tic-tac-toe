import { Box } from "@mui/system";

const TemplateBox = (props) => {
    return (
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
      {props.children}
      </Box>
    );
  };
  
  export default TemplateBox;