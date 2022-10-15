import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls";
import { useHistory } from "react-router-dom";



export default function Topbar() {
  const dispatch = useDispatch();
  const admin = useSelector(state=>state.user.currentUser);
  const history = useHistory();
    
  const handleClick = () =>{
    logoutUser(dispatch);
    history.push("/login");
  }





  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">{admin?.username}</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings className = "set"/>
            <button onClick={handleClick} className="logout">logOut</button>
          </div>
          <img src={admin?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" } alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
