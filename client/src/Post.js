import React from 'react'
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
const Post = ({title, summary, content, cover,createdAt,_id}) => {
  return (
    <>
    <div className="content">
        <div className="imhp">
        <Link to={`/post/${_id}`}>
          <img
            src={'http://localhost:4000/'+cover}
            className="first"
          />
          </Link>
       
          <div className="info">
            <Link to={`/post/${_id}`}style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>
             {title}
            </h2>
            </Link>
         
            <p className='update'>
              <a className='author'></a>
              <time>{formatISO9075(new Date(createdAt),'MMM d,yyyy HH:mm')}</time>

            </p>
            <p>
             {summary}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post