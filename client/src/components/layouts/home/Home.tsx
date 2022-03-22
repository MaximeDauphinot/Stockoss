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
import CircularProgress from "@mui/material/CircularProgress";

import { GetEventDatas } from "../../../types/event";
import { formatDate } from "../../../utils/dateFormat";

const useStyles = makeStyles({
  root: {
    padding: "40px 40px",
  },
  logo: {
    maxWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
});

export const Home: React.FC = () => {
  const [datas, setDatas] = useState<GetEventDatas[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/events")
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        setDatas(response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  if (!datas) return null;
  if (isLoading) return <CircularProgress sx={{ mt: 10 }} />;

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
        {datas.map((data, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <Link to={`/event/${data._id}`} className={classes.link}>
                <CardHeader
                  title={data.title}
                  subheader={formatDate(data.date)}
                  sx={{
                    color: "rgba(42,73,82,1)",
                  }}
                />
              </Link>
              <CardMedia
                component="img"
                height="194"
                image={data.cover}
                alt={data.title}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {data.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
