import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../Usercontext";

const Postpages = () => {
  const [postInfo, setPostInfo] = useState(null);
  const {userinfo}=useContext(UserContext)
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPostInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  // Conditional rendering to prevent accessing null postInfo
  if (!postInfo) {
    return <div>Loading...</div>; // Or a spinner or any other loading indicator
  }

  return (
    <div className="postpage">
      <h1>{postInfo.title}</h1>
      <div style={{ textAlign: "center", marginBottom: "5px" }}>
        <time>
          {formatISO9075(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
        </time>
        <div className="edit-btn">
          
        </div>
      </div>

      <div className="postpage-img">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="Post Cover" />
      </div>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default Postpages;
