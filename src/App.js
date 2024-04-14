import { Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RegexAlert from "./components/Alert";
import DocsMenu from "./components/DocMenu";

function App() {
  const [routingForm, setRoutingForm] = useState("");
  const [showData, setShowData] = useState(true);
  const [bankData, setBankData] = useState({
    bankCode: "001",
    bankName: "Bank of Montreal",
  });
  const [key, setKey] = useState(0);
  const [alert, setAlert] = useState(false);

  const sendRequest = async () => {
    const regex = /^\d{3}-\d{5}$|^\d{8}$/;
    if (routingForm === "" || regex.test(routingForm) === false) {
      return setAlert(true);
    } else {
      setAlert(false);
    }
    const bankCode = extractBankCode();
    const url =
      "https://uvz9pac8ik.execute-api.us-east-2.amazonaws.com/dev/bank";
    const body = `?instNum=${bankCode}`;
    const response = await axios.get(url + body);
    console.log(response);
    if (response.status === 200) {
      setBankData({
        bankCode: response.data.Item.instNum,
        bankName: response.data.Item.instName,
      });
      setShowData(true);
      setRoutingForm("");
      setKey(key + 1);
    }
  };

  const extractBankCode = () => {
    if (routingForm.includes("-")) {
      return routingForm.split("-")[0];
    } else {
      return routingForm.slice(0, 3);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ position: "absolute", top: 50, right: 80 }}>
          <DocsMenu />
        </div>
        <div className="content">
          <div className="Page-header">
            <div
              style={{
                marginBottom: "15px",
                fontSize: "30px",
              }}
            >
              Canadian Routing Number Look up
            </div>
            <div
              style={{
                fontSize: "16px",
              }}
            >
              Direct Payment Routing Number for international wire
            </div>
            <div
              style={{
                fontSize: "16px",
              }}
            >
              (non Canadian wires)
            </div>
          </div>
          {alert && <RegexAlert key={key} />}
          <div className="routing-form">
            <input
              id="outlined-basic"
              placeholder="Enter routing number e.g. XXX-YYYYY or XXXYYYYY" // Add this line
              label="Routing Number"
              onChange={(event) => setRoutingForm(event.target.value)}
              className="input"
              key={key}
            />
            <button
              className="validate-button"
              onClick={sendRequest}
              disabled={true}
            >
              Validate
            </button>
          </div>
          {showData && (
            <Paper className="bank-data">
              <div
                className="bank-row"
                style={{
                  marginBottom: "10px",
                }}
              >
                <div className="bank-key">Bank Code:</div>
                <div className="bank-value">
                  <div style={{ color: "rgb(90, 85, 152)" }}>
                    {bankData.bankCode}
                  </div>
                  <ContentCopyIcon
                    style={{
                      marginLeft: "10px",
                      height: "15px",
                      width: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => copyToClipboard(bankData.bankCode)}
                  />
                </div>
              </div>
              <div className="bank-row">
                <div className="bank-key">Bank Name:</div>
                <div className="bank-value">
                  <div style={{ color: "rgb(90, 85, 152)" }}>
                    {bankData.bankName}
                  </div>
                  <ContentCopyIcon
                    style={{
                      marginLeft: "10px",
                      height: "15px",
                      width: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => copyToClipboard(bankData.bankName)}
                  />
                </div>
              </div>
            </Paper>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
