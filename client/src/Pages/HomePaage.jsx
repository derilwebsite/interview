import { Button } from "@material-ui/core";
import Table from "../Component/Table";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../Component/Modal";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import { useEffect, useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import { ErrorCodes } from "../Helper/ErrorCode";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    age: "",
  });
  const [Users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Users.length > 0) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [Users]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const resdata = await axios.get("/api/user/get");
      setUsers(resdata.data);
    } catch (err) {}
  };

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  const handleModal = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      pincode: "",
      age: "",
    });
    setShowModal(true);
  };

  const handleUpdate = async (id) => {
    try {
      setFormData({ ...id });
      setEdit(true);
      setShowModal(true);
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const resdata = await axios.delete(`/api/user/delete/${id}`);
      setOpen(true);
      setLoading(false);
      setMessage(resdata.data);
      fetchUser();
    } catch (err) {
      ErrorCodes(err,setMessage)
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (Edit) {
        const resdata = await axios.post(
          `/api/user/edit/${FormData._id}`,
          FormData
        );
        setOpen(true);
        setLoading(false);
        setMessage(resdata.data);
        setEdit(false);
        fetchUser();
      } else {
        const resdata = await axios.post("/api/user/new", FormData);
        setLoading(false);
        setOpen(true);
        setMessage(resdata.data);
        fetchUser();
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        pincode: "",
        age: "",
      });
    } catch (err) {
      ErrorCodes(err,setMessage)
    }
  };
  return (
    <div className="App">
      <Button variant="contained" onClick={handleModal} color="primary">
        <AddIcon /> Add user
      </Button>

      <Table
        data={Users}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      {showModal ? (
        <Modal title="Please add new user">
          <form onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              value={FormData.name}
              required
            />
            <TextField
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              value={FormData.email}
              required
            />
            <TextField
              id="outlined-basic"
              name="phone"
              label="Phone"
              variant="outlined"
              onChange={handleChange}
              value={FormData.phone}
              required
            />
            <TextField
              id="outlined-basic"
              name="pincode"
              label="Pincode"
              variant="outlined"
              onChange={handleChange}
              value={FormData.pincode}
              required
            />
            <TextField
              id="outlined-basic"
              name="age"
              label="Age"
              variant="outlined"
              onChange={handleChange}
              value={FormData.age}
              required
            />
            <div className="flex-row">
              <Button
                variant="contained"
                onClick={() => setShowModal(false)}
                type="button"
                color="secondary"
              >
                <CancelIcon /> Close
              </Button>
              <Button variant="contained" type="submit" color="primary">
                <SaveIcon /> Save
              </Button>
            </div>
          </form>
        </Modal>
      ) : null}

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        message={message}
      />

      <Backdrop className={classes.backdrop} open={Loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default HomePage;
