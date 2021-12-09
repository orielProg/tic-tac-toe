import { Box } from "@mui/system";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { ButtonBase, Typography } from "@mui/material";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const Square = (props) => {
  const [currentState, setState] = useState("");

  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      <ImageButton focusRipple>
        <ImageSrc>
          <img
            src={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/hollow-red-circle_2b55.png"}
            srcSet={"https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/hollow-red-circle_2b55.png"}
          />
        </ImageSrc>
        <ImageBackdrop className="MuiImageBackdrop-root" />
      </ImageButton>
    </Box>
  );
};

export default Square;
