import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./user.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../redux/apiCalls";
import { format } from "timeago.js";
import { Helmet } from "react-helmet-async";


export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [inputs,setInputs] = useState({});
  const [file,setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  
  //use to get one user
  const user = useSelector((state) =>
  state.other.users.find((user) => user._id === userId)
);

console.log(inputs)

const handleChange = (e) =>{
  setInputs(prev=>{
  return {...prev,[e.target.name]:e.target.value}
  })
  };


const handleClick = (e) =>{
  e.preventDefault();
  const fileName = new Date().getTime() + file?.name;
  const storage = getStorage(app);
  const storageRef = ref(storage,fileName);

  const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const user ={...inputs,img:downloadURL};
      updateUser(userId,user,dispatch)
      history.push("/users")
    });
  }
);
}
  
  
  
  
  return (
    <>
      <Helmet>
        <title>{user.username}</title>
        <meta name="description" content="user"/>
      </Helmet>
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.img}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                <span className="userShowUserTitle">{user.gender}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{format(user.createdAt)}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.phone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="username"
                    className="userUpdateInput"
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="annabeck99@gmail.com"
                    className="userUpdateInput"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src={user.img}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])}  />
                </div>
                <button onClick={inputs && file && handleClick} className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
