import axios from 'axios';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLoginClick = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8080/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        toast.success('Login successful!');
        navigate('/dashboard');
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.form);
    setEmail(formData.get('email'));
    setPassword(formData.get('password'));
  };

  return (
    <div className="container w-25 my-5">
      {' '}
      <form onChange={handleInputChange}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
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
        <Button variant="success"
          type="button"
          className="btn btn-primary btn-block mb-4 w-100"
          onClick={(event) => handleLoginClick(event)}
        >
          Sign in
        </Button>
      </form>
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

export default Login;
