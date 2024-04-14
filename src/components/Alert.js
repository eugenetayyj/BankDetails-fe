import Alert from "@mui/material/Alert";
import * as React from "react";

const ErrorAlert = (props) => {
  let message;
  switch (props.type) {
    case "regex":
      message = "Please enter a valid routing number";
      break;
    case "notFound":
      message = "Bank not found";
      break;
    default:
      message = "An error occurred. Please try again later";
      break;
  }

  return (
    <Alert
      style={{
        marginBottom: "10px",
        width: "100%",
        borderRadius: "5px",
      }}
      severity="error"
    >
      {message}
    </Alert>
  );
};

export default ErrorAlert;
