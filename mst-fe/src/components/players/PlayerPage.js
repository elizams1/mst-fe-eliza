import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PlayerPage.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:'16px',
};

function PlayerPage() {
  
  const [players, setPlayers] = useState([]);
  //mengatur modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //search data
  const [birthPlace, setBirthPlace] = useState('');

  useEffect(()=>{
    axios
      .get("https://localhost:7251/api/Players")
      .then(function (data){
        console.log(data.data);
        setPlayers(data.data);
      })
      .catch(function (error){
        console.log(error);
      })
  },[])

  //proses post data
  const postData = () => {
    axios
      .post("https://localhost:7251/api/Players?id=7&name=nam&age=12&birthPlace=poki")
      .then(function (response) {
        console.log(response);
        if(response.status ===200){
          setOpen(false);
          alert("data berhasil ditambahkan");
        }
      })
      .catch(function(error){
        console.log(error);
      });
  }

  const searchData = () =>{
    axios
      .get("https://localhost:7251/api/Players?birthPlace="+ birthPlace)
      .then(function(data){
        console.log(data.data);
        setPlayers(data.data);
      })
      .catch(function (error){
        console.log(error);
      })
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Daftar Pemain</h1>
        </div>
        <div className="header-two">
          <div>
            <button className="btn btn-primary" onClick={handleOpen}>Tambah</button>
          </div>
          <div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Cari tempat lahir" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={e => setBirthPlace(e.target.value)}></input>
              <button className="btn btn-primary" type="button" id="button-addon2" onClick={searchData}>Button</button>
            </div>
          </div>
        </div>

        {/* modal */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 className="header-modal">Tambah Pemain</h2>
            <div className="form-section">
              <h6 className="form-title">Name</h6>
              <input className="form-control" placeholder='Name'></input>
            </div>
            <div className="form-section">
              <h6>Age</h6>
              <input className="form-control" placeholder='Age'></input>
            </div>
            <div className="form-section">
              <h6>Birth Place</h6>
              <input className="form-control" placeholder='Birth Place'></input>
            </div>
            <button onClick={postData} className="btn btn-primary form-section">
              Submit
            </button>
            
          </Box>
        </Modal>
        
        {/* data */}
        <div>
          <table className="table">
            <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Birth Place</th>
            </thead>
            <tbody>
              {players.map(item=>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.birthPlace}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </>
    
  );
}

export default PlayerPage;


