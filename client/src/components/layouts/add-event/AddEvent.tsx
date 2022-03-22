import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CircularProgress from "@mui/material/CircularProgress";

import { EventDatas } from "../../../types/event";

const useStyle = makeStyles({
  root: {
    marginTop: "50px",
    padding: "40px 40px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    borderRadius: "20px",
  },
  logo: {
    maxWidth: "150px",
  },
  input: {
    display: "none",
  },
  button: {
    color: "blue",
    margin: 10,
  },
  image: {
    maxWidth: "250px",
  },
});

export const AddEvent: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [datas, setDatas] = useState<EventDatas>({
    title: "",
    description: "",
    email: "",
    date: new Date(),
    cover: "",
    comments: [
      {
        auteur: "",
        commentaire: "",
      },
    ],
  });
  const classes = useStyle();

  const sendData = () => {
    setIsLoading(true);
    fetch("http://localhost:5000/add-event", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title: datas.title,
        description: datas.description,
        email: datas.email,
        date: datas.date,
        cover: imagePreview,
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
    e.preventDefault();
    sendData();
    remove();
    setIsLoading(false);
  };

  const photoUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
    }
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setDatas((prevState) => ({
      ...prevState,
      cover: file,
    }));
  };

  const remove = () => {
    setImagePreview("");
    setDatas({
      title: "",
      description: "",
      email: "",
      date: new Date(),
      cover: "",
      comments: [
        {
          auteur: "",
          commentaire: "",
        },
      ],
    });
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.root}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add new event
        </Typography>
        <Box
          component="form"
          // noValidate
          onSubmit={(e: any) => onFileSubmit(e)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                type="file"
                name="avatar"
                id="contained-button-file"
                accept=".jpef, .png, .jpg"
                className={classes.input}
                onChange={photoUpload}
                src={imagePreview}
              />
              <label htmlFor="contained-button-file">
                <Fab component="span" className={classes.button}>
                  <AddPhotoAlternateIcon />
                </Fab>
              </label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                onChange={(e) =>
                  setDatas((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
                value={datas.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
                autoComplete="description"
                onChange={(e) =>
                  setDatas((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }))
                }
                value={datas.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
                onChange={(e) =>
                  setDatas((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
                value={datas.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="date"
                type="date"
                id="date"
                autoComplete="date"
                onChange={(e) =>
                  setDatas((prevState) => ({
                    ...prevState,
                    date: new Date(e.target.value),
                  }))
                }
                // value={datas.date}
              />
              {imagePreview === "" ? null : (
                <img
                  src={imagePreview}
                  alt={"Uploaded"}
                  className={classes.image}
                />
              )}
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Add event
          </Button>
          <Button
            type="reset"
            fullWidth
            variant="contained"
            onClick={() => remove()}
            sx={{ mt: 3, backgroundColor: "red" }}
          >
            Reset all
          </Button>
          {isLoading ? <CircularProgress /> : null}
        </Box>
      </Box>
    </Container>
  );
};
