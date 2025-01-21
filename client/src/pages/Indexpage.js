import React, { useEffect, useState } from 'react'
import Post from '../Post'

const Indexpage = () => {
  const[newposts,setNewposts]=useState([])
  useEffect(()=>{
      fetch("http://localhost:4000/post")
    .then(response=>{
      response.json().then(posts=>{
        setNewposts(posts)
      })
    })
  },[])
  return (
    <div>
      {newposts.length>0&&newposts.map(newpost=>(
          <Post{...newpost}/>
      ))}
       


    </div>
  )
}

export default Indexpage