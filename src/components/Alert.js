import Alert from "@mui/material/Alert";
import * as React from "react";

const RegexAlert = () => {
  return (
    <Alert
      style={{
        marginBottom: "10px",
        width: "100%",
        borderRadius: "5px",
      }}
      severity="error"
    >
      Please enter a valid routing number
    </Alert>
  );
};

export default RegexAlert;
