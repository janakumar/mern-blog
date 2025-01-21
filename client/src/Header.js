import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { UserContext } from './Usercontext'; // Ensure the name matches your export

const Header = () => {
    const { setUserinfo, userinfo } = useContext(UserContext);

  useEffect(()=>{
  fetch("http://localhost:4000/profile",{
    credentials:'include',
  }).then(response=>{
    response.json().then(userinfo=>{
      setUserinfo(userinfo)
    })
  })
  },[]);

  function logout(){
    fetch("http://localhost:4000/logout",{
      credentials:"include",
      method:"POST"
    })
    setUserinfo(null);
  }
const username=userinfo?.username

  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">My Blog</Link>
      </div>
      <div className="link">
        {username ? (
          <>
            <Link to="/create">Create a new post</Link>
            <a onClick={logout}>logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;