import axios from "axios";
import { createContext } from "react";
import { useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {withCredentials:true});
        setUserInfo(response.data);
      } catch(error) {
        console.error("Error fetching user data:", error);
      }
    }
    if(!userInfo) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
    );
}

export default UserContext;