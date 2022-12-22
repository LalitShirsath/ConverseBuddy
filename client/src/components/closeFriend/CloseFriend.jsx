import "./closeFriend.css";
import avatar from "../../assets/person/noAvatar.png";

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="" />
      {/* <img className="sidebarFriendImg" src={avatar} alt="" /> */}
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
