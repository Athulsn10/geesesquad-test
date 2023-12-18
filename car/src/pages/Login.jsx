import axios from 'axios';
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const BASE_URL = 'http://localhost:5000';
    const navigate = useNavigate();


  

    const submitHandler = async() =>{
        if(!email || !password){
          toast.warn("Fill all fields")
        }else{ 
        try {
          const config = {
            headers: {
              "content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            `${BASE_URL}/user/login`,
            { email, password},
            config
          );
          // console.log(BASE_URL);
          localStorage.setItem("userInfo", JSON.stringify(data));
          navigate("/dashboard");
        } catch (error) {
          console.log(error);
          toast.error('invalid credentials')
        }
      }
      };

  return (
    <>
    <div className='container d-flex align-items-center justify-content-center vh-100'>
       
       <div className='border shadow w-50 mt-5 pt-5'>
       <h3 className='text-center'>Login In</h3>
       <Form.Group className="mb-3 mx-4 p-2" >
       <Form.Control onChange={(e) => setEmail(e.target.value)} className='my-2' type="email" placeholder="Enter email" />
       <Form.Control onChange={(e) => setPassword(e.target.value)} className='my-2' type="password" placeholder="Enter password" />
     </Form.Group>
     <div className='d-flex justify-content-center'>
       <button onClick={submitHandler} className='btn btn-primary mb-5'>Login</button>
     </div>
       </div>
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
    
    </>
  )
}

export default Login