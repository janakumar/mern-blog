import React, { useState } from "react";
import "./Registerpage.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  //usetate
  const[username,setuserName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const navigate = useNavigate(); 

//get value from input
const register = (e) => {
  e.preventDefault();
  fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Return parsed JSON here
      })
      .then((data) => {
          alert("Registration successful!");
          navigate("/login");
          console.log("Response data:", data); // Log the data here
      })
      .catch((err) => {
          console.error("Error:", err);
      });
};





  return (
    <div className="registerpage">
      <div className="register">
        <h1 className="head">Register</h1>
        <input type="text" placeholder="Name" value={username} onChange={(e)=>setuserName(e.target.value)}/>
        <input type="email" placeholder="Email" value={email}  onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password}  onChange={(e)=>setPassword(e.target.value)} />
        <button className="reg-btn" onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
