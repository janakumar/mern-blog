const express=require('express')
const cors=require('cors')
const app=express()
const user=require('./model/user')
const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt=require('jsonwebtoken')
const secret='sharonbetsyyyyy'
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs=require('fs')
const post=require('./model/Post')


app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(express.json())
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'))

mongoose.connect("mongodb://localhost:27017/blog")
.then(() => {
  console.log("mongodb connected");
})
.catch((err) => {
  console.log(err);
});

app.post('/register',async(req,res)=>{
  try {
    const{username,email,password}=req.body
    const userdoc=await user.create({username,
      email,
      password: bcrypt.hashSync(password,salt)
    })
    res.json(userdoc)
    
  } catch (e) {
    res.status(400).json(e)
    
  }
 
})


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userdoc = await user.findOne({ email });
    if (!userdoc) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passok = bcrypt.compareSync(password, userdoc.password);
    if (!passok) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const username = userdoc.username;

    jwt.sign(
      { username, id: userdoc._id },
      secret,
      {}, // Options like expiresIn can be added
      (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error generating token" });
        }

        // Return both the cookie and a success message
        res
          .cookie('token', token, { httpOnly: true }) // Ensure the cookie key is 'token' (not 'token:')
          .status(200) // Use 200 for success
          .json({id:userdoc._id,username,});
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/profile',(req,res)=>{
const {token}=req.cookies
jwt.verify(token,secret,{},(err,info)=>{
  if(err) throw err;
  res.json(info)
})
})

//create s ppost 
//post in db code
app.post('/post', upload.single('file'),async (req, res) => {
  const { originalname, path: tempPath } = req.file; // Corrected `orginalname` to `originalname` and renamed `path` to `tempPath`
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = tempPath + '.' + ext; // Use `tempPath` instead of `path`
  fs.renameSync(tempPath, newPath);
 const{title,summary,content}=req.body
  const postdoc=await post.create({
    title,
    summary,
    content,
    cover:newPath,
 })
 res.json(postdoc)
});

//get post from db
app.get('/post', async(req,res)=>{
  const posts= await post.find()
  res.json(posts)
})


// //geta a specific dataa using id
app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  
  // Check if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const postDoc = await post.findById(id);
    if (!postDoc) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(postDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});





app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok')
})

app.listen(4000)