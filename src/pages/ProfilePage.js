import { useContext } from "react";
import UserContext from "../context/UserContext";

function ProfilePage() {

  const { userInfo } = useContext(UserContext); 

  return(
    <div className="flex mx-auto max-w-5xl px-3 items-center">
      <div>
        Welcome, { userInfo ? userInfo.fullName : 'Loading...' }
      </div>
    </div>
  );

}

export default ProfilePage;