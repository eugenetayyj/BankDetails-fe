import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";

const DocsMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleReroute = (type) => {
    if (type === "be") {
      window.open("https://github.com/eugenetayyj/BankDetailsAPI", "_blank");
    } else if (type === "fe"){
      window.open("https://github.com/eugenetayyj/BankDetails-fe", "_blank");
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "black", backgroundColor: "white" }}
      >
        <GitHubIcon style={{ marginRight: "10px" }} />
        Documentation
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleReroute()}
      >
        <MenuItem onClick={() => handleReroute("fe")}>Frontend</MenuItem>
        <MenuItem onClick={() => handleReroute("be")}>Backend</MenuItem>
      </Menu>
    </div>
  );
};

export default DocsMenu;
