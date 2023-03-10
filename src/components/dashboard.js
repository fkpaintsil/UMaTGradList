import { useState } from 'react';

import axios from 'axios';
import Graduates from './graduates';
import Button from 'react-bootstrap/Button';
import { toast, ToastContainer } from 'react-toastify';

function Dashboard() {

  const [file, setFile] = useState(null);

  const handleUploadClick = (event) => {
    event.preventDefault();
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    axios
    .post("http://localhost:8080/graduates/upload-graduates-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((data) => {
        toast.success('file uploaded successfully')
        window.location.reload()
      })
      .catch((err) => console.error(err));
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="container mt-5">
      <form encType="multipart/form-data" className='d-flex justify-content-end'>
        <input
        className="form-control w-50"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
        <Button variant='success' onClick={(event) => handleUploadClick(event)} disabled={!file}>Upload</Button>
      </form>
      <Graduates />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
