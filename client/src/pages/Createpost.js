import React, { useState } from 'react';
import './Createpost.css';
import ReactQuill from 'react-quill'; // Corrected import (capital R)
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom'; // Import Quill styles

const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],         // Text formatting
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Lists
      [{ 'align': [] }],                      // Text alignment
      ['link', 'image'],                      // Add a link and image
      ['clean'],                              // Clean formatting (reset)
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'list', 'ordered', 'bullet',
    'underline', 'indent',
    'link', 'image',
  ];

export const Createpost = () => {
    const [title,setTitle]=useState('')
    const [summary,setSummary]=useState('')
    const [content,setContent]=useState('')
    const [files,setFiles]=useState('')
    const[redirect,setRedirect]=useState(false)
    const navigate=useNavigate()

    const createnewpost= async(e)=>{
         e.preventDefault();
         const data =new FormData()
         data.set('title',title)
         data.set('summary',summary)
         data.set('content',content)
         data.set('file',files[0])
    const response=await  fetch("http://localhost:4000/post",{
          method:'POST',
          body:data,
         })
         if(response.ok){
          setRedirect(true)
         }
         if (response.ok) {
          // Redirect to the home page after successful post creation
          navigate('/');
      }
    }


  return (
    <div className="createpost">
      <form onSubmit={createnewpost}>
        <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <input type="text" placeholder="Summary" value={summary} onChange={(e)=>setSummary(e.target.value)} />
        <input type="file" onChange={(e)=>setFiles(e.target.files)} />
        <ReactQuill 
          modules={modules} 
          formats={formats} 
          value={content}
          onChange={(content) => setContent(content)}
          placeholder="Write your post..." 
        />
        <button className="create-btn">Create Post</button>
      </form>
    </div>
  );
};
