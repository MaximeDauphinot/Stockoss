import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { GetEventDatas, Comment } from "../../../types/event";
import { formatDate } from "../../../utils/dateFormat";

const useStyles = makeStyles({
  root: {
    padding: "40px 40px",
  },
  comment: {
    minWidth: "500px",
  },
});

export const Event: React.FC = () => {
  const [data, setData] = useState<GetEventDatas>();
  const [comment, setComment] = useState<Comment>({
    auteur: "",
    commentaire: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const classes = useStyles();
  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/event/${id}`)
      .then((response) => response.json())
      .then((response) => {
        setIsLoading(false);
        setData(response);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  }, [id]);

  const sendData = () => {
    setIsLoading(true);
    fetch(`http://localhost:5000/add-comment/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        auteur: comment.auteur,
        commentaire: comment.commentaire,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFileSubmit = (e: any) => {
    sendData();
    remove();
    setIsLoading(false);
  };

  const remove = () => {
    setComment({
      auteur: "",
      commentaire: "",
    });
  };

  if (!data || !comment) return null;
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
        <Card sx={{ minWidth: 600 }}>
          <CardHeader title={data.title} subheader={formatDate(data.date)} />
          <CardMedia
            component="img"
            height="400"
            image={data.cover}
            alt={data.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
            <List dense={true}>
              {data.comments.map((comment, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={comment.auteur}
                    secondary={comment.commentaire}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <Box
            component="form"
            // noValidate
            onSubmit={(e: any) => onFileSubmit(e)}
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} className={classes.comment} sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                id="auteur"
                label="Auteur"
                name="auteur"
                autoComplete="auteur"
                onChange={(e) =>
                  setComment((prevState) => ({
                    ...prevState,
                    auteur: e.target.value,
                  }))
                }
                value={comment.auteur}
              />
            </Grid>
            <Grid item xs={12} className={classes.comment} sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                id="commentaire"
                label="Commentaire"
                name="commentaire"
                autoComplete="commentaire"
                onChange={(e) =>
                  setComment((prevState) => ({
                    ...prevState,
                    commentaire: e.target.value,
                  }))
                }
                value={comment.commentaire}
              />
            </Grid>
            <Box component={"div"} sx={{ display: "flex" }}>
              <Grid item xs={6} sx={{ margin: "auto 10px" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Add comment
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ margin: "auto 10px" }}>
                <Button
                  type="reset"
                  fullWidth
                  variant="contained"
                  onClick={() => remove()}
                  sx={{ mt: 3, backgroundColor: "red" }}
                >
                  Reset all
                </Button>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};
