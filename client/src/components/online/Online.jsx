import "./online.css";
import avatar from "../../assets/person/noAvatar.png";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        {/* <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" /> */}
        <img className="rightbarProfileImg" src={avatar} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
