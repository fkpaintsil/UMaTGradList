import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { API_BASE } from '../constants';
import Toast from '../utils/Toast';
import SpinnerUtil from '../utils/SpinnerUtil';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = (event) => {
    setIsLoading(true);
    event.preventDefault();
    axios
      .post(`${API_BASE}/auth/login`, { username, password })
      .then((res) => {
        localStorage.setItem('token', res.data);

        Toast('success', 'Login successful!');
        setIsLoading(false);
        navigate('/dashboard');
      })
      .catch((error) => {
        setIsLoading(false);
        Toast('error', 'Invalid Username or Password');
      });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.form);
    setUsername(formData.get('username'));
    setPassword(formData.get('password'));
  };

  return (
    <>
    {isLoading && <SpinnerUtil />}
    {!isLoading && <div className="container w-25 my-5">
      {' '}
      <form onChange={handleInputChange}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="username"
            id="username"
            className="form-control"
            name="username"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
          />
        </div>
        <Button
          variant="success"
          type="button"
          className="btn btn-primary btn-block mb-4 w-100"
          onClick={(event) => handleLoginClick(event)}
        >
          Sign in
        </Button>
      </form>
    </div>}
    </>
  );
}

export default Login;
