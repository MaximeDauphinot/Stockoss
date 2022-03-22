import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const allLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Add Event",
    path: "add-event",
  },
];

const useStyles = makeStyles({
  logo: {
    maxWidth: "150px",
  },
  link: {
    alignSelf: "center",
    margin: "auto 10px",
    textDecoration: "none",
    color: "rgb(255 227 192)",
  },
});

export const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1, display: "flex" }}>
      <AppBar
        position="static"
        style={{ flexDirection: "row", backgroundColor: "rgba(42,73,82,1)" }}
      >
        <Link to={"/"}>
          <img
            alt={"Logo"}
            className={classes.logo}
            src={
              "//d9hhrg4mnvzow.cloudfront.net/solutions.stockoss.com/fr/offre/5dd4344a-200416-stockoss-logo-v02-04_105903p000000000000028.png"
            }
          />
        </Link>
        {allLinks.map((link, i) => (
          <Link key={i} to={link.path} className={classes.link}>
            {link.title}
          </Link>
        ))}
      </AppBar>
    </Box>
  );
};
