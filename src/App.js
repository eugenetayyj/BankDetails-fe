import "./App.css";
import { Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [routingForm, setRoutingForm] = useState("")
  const [showData, setShowData] = useState(false)
  const [bankData, setBankData] = useState({})

  const sendRequest = async () => {
    const url = "https://uvz9pac8ik.execute-api.us-east-2.amazonaws.com/dev/bank";
    const body = `?instNum=${routingForm}`;
    const response = await axios.get(url + body);
    console.log(response)
    if (response.status === 200) {
      setBankData({
        bankCode: response.data.Item.instCode,
        bankName: response.data.Item.instName,
      });
      setShowData(true)
    }
  }

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
            onClick={sendRequest}
          >
            Validate
          </Button>
        </Paper>
        {showData && <Paper>
          <div>Bank Code: {bankData.bankCode}</div>
          <div>Bank Name: {bankData.bankName}</div>
        </Paper>}
      </header>
    </div>
  );
} 

export default App;
