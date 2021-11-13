import Card from "@mui/material/Card";

const TemplateCard = (props) => {
  return (
    <Card
      sx={{
        alignItems: "center",
        flexDirection: "column",
        display: "flex",
      }}
    >
      {props.children}
    </Card>
  );
};

export default TemplateCard;
