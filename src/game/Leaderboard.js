import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getArrayOfUsers } from "../components/auth/firebase";

const columns = [
  { field: "id", headerName: "Rank" },
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
      array.sort((a,b) => {
        return b.wins-a.wins;
      });
      const rows = array.map((element,index) => ({
        id: index+1,
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
    <Box
    sx={{
      flexDirection: "column",
    }}
  >
    {Header}
  </Box>
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
