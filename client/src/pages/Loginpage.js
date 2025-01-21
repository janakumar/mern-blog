import React, { useContext } from 'react'
import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Usercontext';

const Loginpage = () => {

  const navigate = useNavigate();
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const{setUserinfo}=useContext(UserContext)

  const login = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Response status:", response.status); // Debugging
  
      if (response.ok) {
       response.json()
        .then(userinfo=>{
          setUserinfo(userinfo)
          navigate('/'); 
        })
       // Navigate to homepage on success
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Wrong credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred. Please try again later.");
    }
  };
  
  return (
    <div className='loginpage'>
      <div className='login'>
      <h1 className='head'>Login</h1>
        <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button className='log-btn' onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Loginpage