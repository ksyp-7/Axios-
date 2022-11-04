import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [path, setPath] = React.useState([]);
  const history = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setPath(location.pathname.split("/"));
    console.log(location.pathname.split("/"));
  }, []);

  React.useEffect(() =>{
    if (path[1] === "edit") {
      axios
        .get(`https://63625f1e7521369cd06bd752.mockapi.io/CRUD/${path[2]}`)
        .then((response) => {
          setName(response.data.name);
          setNumber(response.data.number)
        });
    } 
  },[path])
  const formSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`https://63625f1e7521369cd06bd752.mockapi.io/CRUD`, {
        name,
        stream: "Computer Sci",
        number,
      })
      .then((response) => {
        response.status === 201 && createSuc();
        setTimeout(() => {
          history("/");
        },5000)
      });
  };
  const updateData = async () => {
    await axios
    .put(`https://63625f1e7521369cd06bd752.mockapi.io/CRUD/${path[2]}`, {
      name,
      stream: "Computer Sci",
      number,
    })
    .then((response) => {
      response.status === 200 && updateSuc()
      setTimeout(() => {
        history("/");
      },5000)
    });
  }

  const updateSuc = () => {
    toast.success("User Updated Sucessfully", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  const createSuc = () => {
    toast.success("User Created  Sucessfully", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      className="main-form"
      onSubmit={formSubmit}
    >
      <div className="create-container">
        <TextField
          required
          id="standard-required"
          label="Name"
          placeholder="Enter Name"
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          id="standard-read-only-input"
          label="Devison"
          defaultValue="Computer Sci"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id="standard-number"
          label="Phone Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          onChange={(e) => setNumber(e.target.value)}
          value={number}
        />
        {path[1] === "edit" ? (
          <Button variant="outlined" onClick={updateData} className="submit-btn">
            Update
          </Button>
        ) : (
          <Button variant="outlined" type="submit" className="submit-btn">
            Submit
          </Button>
        )}
      </div>
      <ToastContainer />
    </Box>
  );
};

export default Create;
