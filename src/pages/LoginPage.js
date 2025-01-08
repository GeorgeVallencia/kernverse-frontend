import { useState, useContext } from "react";
import { GoMail, GoLock, GoPerson } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';


function LoginPage() {
  
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  async function Login() {

    try {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({
        fullName,
        username,
        password
      }),
      headers: {
        // 'Authorization': 'Bearer jshfjhdgfhfgjs',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })

    if (!response.ok) {
        // Handle errors if the response is not OK
        const errorData = await response.json();
        throw new Error(errorData.message || 'login failed');
      }

      const data = await response.json();
      setUserInfo({ fullName: userInfo.fullName, username: userInfo.username, token: data.token });
      // console.log('Registration successful:', data);
      navigate('/published-posts');

    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error logging in user:', error.message);
    }  
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

 const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Login();
    // navigate('/create');
  }

  return(
    <div className="max-w-5xl mx-auto px-3 my-5 justify-center items-center">
      <p className="text-center">Welcome</p>
      <p className="text-center my-4">Login to Proceed</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {errorMessage && ( // Conditionally render the error message
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
              <GoPerson size={20} className="text-teal-500 translate-x-8" />
          </div>
          <input value={fullName} onChange={handleFullNameChange} type='text' placeholder="Full Name" className="w-60 outline-none border shadow-lg rounded-lg py-2 pl-10" />
        </div>
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
              <GoMail size={20} className="text-teal-500 translate-x-8" />
          </div>
          <input value={username} onChange={handleChange} type='email' placeholder="Email Address" className="w-60 outline-none border shadow-lg rounded-lg py-2 pl-10" />
        </div>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <GoLock size={20} className='text-teal-500 translate-x-8'/>
          </div>
          <input value={password} onChange={handlePassChange} type='password' placeholder="Password" className="w-60 outline-none border shadow-lg rounded-lg py-2 pl-10" />
        </div>
        <div className="flex justify-center">
          <button to='/' className="border px-5 py-2 ml-4 w-60 bg-teal-500 text-white rounded-lg font-bold">Login</button>
        </div>
      </form>
      <p className="mx-auto text-center my-4">Don't have an account yet? <Link to='/register' className="underline hover:text-teal-400">Register</Link></p>
    </div>
  );
};

export default LoginPage;