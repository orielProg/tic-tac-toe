import { getArrayOfUsers } from "../components/auth/firebase";
import { DataGrid } from "@mui/x-data-grid";
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import { useState, useEffect, Fragment } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, TableContainer } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Paper } from "@mui/material";
import TemplateBox from "../layout/TemplateBox";

const columns = [
  { field: "username", headerName: "Username" },
  { field: "totalgames", headerName: "Total games", width: 150 },
  { field: "wins", headerName: "Wins" },
  { field: "loses", headerName: "Loses" },
  { field: "ties", headerName: "Ties" },
];

const Leaderboard = (props) => {
  const history = useHistory();
  const [rowsData, setRowsData] = useState([]);

  const goBack = () => {
    history.push("/menu");
  };

  useEffect(() => {
    const getLeaderboard = async () => {
      const array = await getArrayOfUsers();
      const rows = array.map((element) => ({
        id: element.username,
        username: element.username,
        totalgames: element.wins + element.loses + element.ties,
        wins: element.wins,
        loses: element.loses,
        ties: element.ties,
      }));
      console.log(rows);
      setRowsData(rows);
    };
    getLeaderboard().catch((error) => {
      alert(error);
    });
  }, []);

  const Header = (
    <IconButton onClick={goBack}>
      <ArrowBackIcon />
    </IconButton>
  );

  return (
    <Fragment>
      <TemplateBox>{Header}</TemplateBox>
      <div style={{ height: 400, width: 700 }}>
        <DataGrid
          rows={rowsData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Fragment>
  );
};

export default Leaderboard;
