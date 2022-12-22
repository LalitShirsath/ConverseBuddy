import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import avatar from "../../assets/person/noAvatar.png";

// import {LogoutButton} from "../logout/Logout";
// import { useHistory } from 'react-router-dom';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const logout = () => {
    localStorage.removeItem('token-info');
    window.localStorage.clear();
    window.location.href = "http://localhost:3000/login";
  };


  // const history = useHistory();

  // const handleClick = () => {
  //     history.push("/messenger");
  // }


  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ConverseBuddy</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{textDecoration: 'none', color:'#ffffff'}}>
            <span  className="topbarLink">Homepage</span>
          </Link>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{ textDecoration: 'none', color: '#FFFFFF' }}> 
              <Chat />
            </Link>
            {/* <span className="topbarIconBadge"></span> */}
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            // src={
            //   user.profilePicture
            //     ? PF + user.profilePicture
            //     : PF + "person/noAvatar.png"
            // }
            src={avatar}
            alt=""
            className="topbarImg"
          />
        </Link>

        <Link to="/login" className="logout">
            <button  onClickCapture={logout}>
              <LogoutIcon style={{cursor: 'pointer'}}/>
            </button>
        </Link>
      </div>
    </div>
  );
}
