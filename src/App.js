import { Paper } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ErrorAlert from "./components/Alert";
import DocsMenu from "./components/DocMenu";

function App() {
  const [routingForm, setRoutingForm] = useState("");
  const [showData, setShowData] = useState(false);
  const [bankData, setBankData] = useState({});
  const [key, setKey] = useState(0);
  const [alert, setAlert] = useState({boolean: false, type: ""});

  const sendRequest = async () => {
    setShowData(false);
    setKey(key + 1)
    const regex = /^\d{3}-\d{5}$|^\d{8}$/;
    if (routingForm === "" || regex.test(routingForm) === false) {
      return setAlert({boolean: true, type: "regex"});
    } else {
      setAlert({boolean: false, type: ""});
    }
    const bankCode = extractBankCode();
    const url =
      "https://uvz9pac8ik.execute-api.us-east-2.amazonaws.com/dev/bank";
    const body = `?instNum=${bankCode}`;
    const response = await axios.get(url + body);
    console.log(response);
    if (response.status === 200 && !isEmpty(response.data.Item)) {
      setBankData({
        bankCode: response.data.Item.instNum,
        bankName: response.data.Item.instName,
      });
      setShowData(true);
      setRoutingForm("");
      setKey(key + 1);
    } else if (response.status === 200 && isEmpty(response.data.Item)) {
      setAlert({boolean: true, type: "notFound"})
    } else {
      setAlert({boolean: true, type: "error"})
    }
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }
  
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
          {alert.boolean && <ErrorAlert key={key} type={alert.type}/>}
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
            >
              Validate
            </button>
          </div>
          {showData && (
            <Paper className="bank-data" key={key}>
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
