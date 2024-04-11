import "./App.css";
import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

function App() {
  const [routingForm, setRoutingForm] = useState("")

  const sendRequest = async () => {

  }

  useEffect(() => {
    console.log(routingForm)
  })

  return (
    <div className="App">
      <header className="App-header">
        <div>Canadian Bank Routing Number Look up</div>
        <Paper elevation={10} className="paper">
          <TextField
            id="outlined-basic"
            label="Routing Number"
            variant="outlined"
            onChange={ (event) => setRoutingForm(event.target.value) }
            style={{
              position: "flex",
              width: "80%",
              marginRight: "5px",
            }}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "green",
              color: "white",
            }}
          >
            Validate
          </Button>
        </Paper>
      </header>
    </div>
  );
}

export default App;
