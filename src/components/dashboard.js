import { useEffect, useState } from 'react';

import axios from 'axios';
import Graduates from './graduates';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../constants';
import Toast from '../utils/Toast';
import SpinnerUtil from '../utils/SpinnerUtil';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    //TODO: Validate token
  }, []);

  const [file, setFile] = useState(null);

  const handleUploadClick = (event) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post(`${API_BASE}/graduates/upload-graduates-csv`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((_data) => {
        window.location.reload();
        setIsLoading(false);
        Toast('success', 'file uploaded successfully');
      })
      .catch((_err) => {
        setIsLoading(false);
        Toast('error', 'Failed to upload file');
      });
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleLogoutClick = () => {
    //TODO: post token to backend for invalidation
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {isLoading && <SpinnerUtil />}
      {!isLoading && (
        <div className="container mt-5">
          <div className="d-flex justify-content-between">
            <form encType="multipart/form-data">
              <input
                className="form-control"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
              <Button
                variant="success"
                onClick={(event) => handleUploadClick(event)}
                disabled={!file}
              >
                Upload
              </Button>
            </form>
            <form>
              <Button variant="danger" onClick={handleLogoutClick}>
                Logout
              </Button>
            </form>
          </div>

          <Graduates />
        </div>
      )}
    </>
  );
}

export default Dashboard;
