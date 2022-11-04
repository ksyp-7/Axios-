import DataTable from 'react-data-table-component';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://63625f1e7521369cd06bd752.mockapi.io/CRUD`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const getUpdateData = () => {
    axios
      .get(`https://63625f1e7521369cd06bd752.mockapi.io/CRUD`)
      .then((response) => {
        setData(response.data);
      });
  }
  const deleteData = async (id,name) => {
    if(window.confirm("Do You Want To Delete "+`${name}'s` + " Data")){
    await  axios.delete(`https://63625f1e7521369cd06bd752.mockapi.io/CRUD/${id}`).then(() => {
        getUpdateData();
      })
      notify();

    }
  }
  const columns = [
    { selector: row => row.id, name: 'ID'},
    { selector: row => row.name, name: 'Name', width:"180px"},
    { selector: row => row.stream, name: 'Stream', width:"180px"},
    {
      selector: row => row.number,
      name: 'Number',
      type: 'number',
      width:"180px"
    },
    {
      name: 'Action',
      button:true,
      cell:(row) => ( <div className="link-container"><Link className="edit" to={`/edit/${row.id}`}><EditIcon /></Link> <DeleteForeverIcon onClick={() => deleteData(row.id,row.name)}/></div>),
    ignoreRowClick: true,
    allowOverflow: true,
    },
  ];
  const notify = () => {
    toast.success("User Deleted Sucessfully", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  
  return <div className="home-container">
     <DataTable
        columns={columns}
        data={data}
    />
      <ToastContainer />
  </div>;
};

export default Home;
