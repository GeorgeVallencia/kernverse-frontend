import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { LuPenSquare } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import logo from '../media/kern-logo.png';

function NavBar() {

  // const [ username, setUsername ] = useState('');
  const { userInfo, setUserInfo } = useContext(UserContext);
  
  // const fetchProfile = async() => {
  //   try {
  //   const response = await fetch('http://localhost:4000/profile', {
  //     credentials: 'include',
  //   });

  //   if(!response.ok) {
  //     throw new Error('Failed to fetch profile'); 
  //   }

  //   // console.log(response);
  //     const userInfo = await response.json();
  //     setUserInfo(userInfo);
  //     // setError(null);
  // } catch(error) {
  //    console.error('Error fetching profile:', error);
  // }
  // // }finally {
  // //     setIsLoading(false); // Update loading state
  // //   }

  // };
  
  

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  // const handleLogoutClick = () => {
  //   fetch('http://localhost:4000/logout', {
  //     method: 'POST',
  //     credentials: 'include',
  //   });
  //   setUserInfo(null);
  // };

  // const fullName = userInfo?.fullName || 'Guest';

  return(
    <div className="flex items-center tracking-wide mx-auto max-w-5xl my-2 py-3 px-3">
      <Link to='/published-posts' className="cursor-pointer">
        <img src={logo} alt='image-logo' className="hover:text-teal-500 italic font-bold w-48 h-auto" />
      </Link>

      { userInfo?
        <div className="ml-auto flex justify-between cursor-pointer px-2">
          <Link to='/create' className="flex items-center text-teal-500 border border-teal-500 px-2 py-1 rounded hover:bg-teal-500 hover:text-white"><span className="mr-2"><LuPenSquare /></span>Write</Link>
          <Link to='/profile' className="flex items-center ml-2">
              <RiAccountCircleFill size={30} className="text-teal-500 mr-2"/>
              {userInfo.fullName}
          </Link>
          {/* <Link onClick={handleLogoutClick} className="px-2 py-1 ml-4 text-teal-500 border border-teal-500 rounded">Logout</Link> */}
        </div>
         : 
         <div className="ml-auto flex">
          <Link to='/login' className="mr-2 py-2 px-5 border border-teal-500 rounded hover:text-teal-500">Login</Link>
          <Link to='/register' className="ml-2 py-2 px-5 border border-teal-500 rounded hover:text-teal-500">Register</Link>
        </div> 
      }
    </div>
  );
  
}
export default NavBar;