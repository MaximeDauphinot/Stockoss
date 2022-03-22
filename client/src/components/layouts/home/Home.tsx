import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { GetEventDatas } from "../../../types/event";

const useStyles = makeStyles({
  root: {
    padding: "40px 40px",
  },
  logo: {
    maxWidth: "150px",
  },
});

export const Home: React.FC = () => {
  const [datas, setDatas] = useState<GetEventDatas[]>();
  const classes = useStyles();

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((response) => response.json())
      .then((response) => {
        setDatas(response);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!datas) return null;

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Home
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <Link to={"/event/" + datas[0]._id}>
                <CardHeader title={datas[0].title} subheader={datas[0].date} />
              </Link>
              <CardMedia
                component="img"
                height="194"
                image={datas[0].cover}
                alt={datas[0].title}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {datas[0].description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
