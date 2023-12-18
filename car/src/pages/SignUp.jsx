import axios from 'axios';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [validEmail, setValidEmail] = useState(true)
  const [validPhone, setValidPhone] = useState(true)
  const [validPass, setValidPass] = useState(true)
  const navigate = useNavigate();
  const BASE_URL = 'http://localhost:5000';


   

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])/;
  
  const submitHandler = async () => {
    if (!name || !email || !password || !phone) {
      toast.warn("Fill in all fields");
      return;
    }
  
    if (!emailRegex.test(email)) {
      setValidEmail(false)
    }
  
    if (!phoneRegex.test(phone)) {
        toast.warning("Password must be at least 6 characters long and contain at least one special character")
        setValidPhone(false)
    }
  
    if (password.length < 6 || !passwordRegex.test(password)) {
        setValidPass(false)
      }
    if(!setValidEmail || !setValidPass || setValidPhone){
        return
    }
  
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        `${BASE_URL}/user/signup`,
        { name, email, password, phone },
        config
      );
  
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
  
      navigate("/login");
    } catch (error) {
      console.error("Error during sign up:", error.message);
      if (error.response && error.response.status === 409) {
        toast.error("User already exists");
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    }
  };
  

  return (
    <div className='container d-flex align-items-center justify-content-center vh-100'>
      <div className='border shadow w-50 mt-5 pt-5'>
        <h3 className='text-center'>Sign Up</h3>
        <Form.Group className="mb-1 mx-4 p-2">
          <Form.Control onChange={(e) => setEmail(e.target.value)} className='my-2' type="email" placeholder="Enter email" />
          {!validEmail? <p className='text-danger'>invalid email format</p>:""}
          <Form.Control onChange={(e) => setName(e.target.value)} className='my-2' type="text" placeholder="Enter name" />
          <Form.Control onChange={(e) => setPhone(e.target.value)} className='my-2' type="text" placeholder="Phone" />
          {!validPhone? <p className='text-danger'>invalid Phone number</p>:""}
          <Form.Control onChange={(e) => setPassword(e.target.value)} className='my-2' type="password" placeholder="Enter password" />
         
          <div className='d-flex flex-column justify-content-center '>
          <button onClick={submitHandler} className='btn btn-primary'>Sign Up</button>
          <p className='text-center'>Already A user? <Link to='/login'>Login</Link></p>
        </div>
        </Form.Group>
       
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default SignUp;
