import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Loginpage from "./pages/Loginpage";
import Indexpage from "./pages/Indexpage";
import Registerpage from "./pages/Registerpage";
import { UserContextProvider } from "./Usercontext";
import { Createpost } from "./pages/Createpost";
import Postpages from "./pages/Postpages";

const App = () => {
  return (
    <UserContextProvider>
         <Routes>
      <Route path="/" element={<Layout/>}> 
      <Route index element={<Indexpage/>}/>
      <Route path="/login" element={<Loginpage/>}/>
      <Route path="/register"element={<Registerpage/>}/>
      <Route path='/create'element={<Createpost/>}/>
      <Route path='/post/:id'element={<Postpages/>}/>
      </Route>
    
    </Routes>
    </UserContextProvider>
 
   
  );
};

export default App;
