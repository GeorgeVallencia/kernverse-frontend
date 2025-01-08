import { useState, useContext } from "react";
import { GoMail, GoLock, GoPerson } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";


function RegisterPage() {

  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const [fullName, setFullName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error handling


  async function Register({ fullName, username, password }) {

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({ fullName, username, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
      }
      
      const userData = await response.json();
      setUserInfo(userData);
      console.log('Registration successful:', userData);
      //setError(null);
      // console.log('Registration successful:', data);
    } catch(error) {
      setError(error.message); // Set error for display
      console.error('Error registering user:', error.message);
    }
  }

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Register({ fullName, username, password });
    navigate('/subscribe');
  }

  return(
    <div className="max-w-5xl mx-auto px-3 my-5 items-center">
      <p className="text-center mb-4">Welcome</p>
      <p className="text-center my-4">Register to continue</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
              <GoPerson size={20} className="text-teal-500 translate-x-8" />
          </div>
          <input type='text' value={fullName} onChange={handleFullNameChange} placeholder="Full Name" className="w-60 outline-none border shadow-lg rounded-lg py-2 pl-10" />
        </div>
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
              <GoMail size={20} className="text-teal-500 translate-x-8" />
          </div>
          <input value={username} onChange={handleNameChange} type='email' placeholder="Email Address" className="w-60 outline-none border shadow-lg rounded-lg py-2 pl-10" />
        </div>
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <GoLock size={20} className='text-teal-500 translate-x-8'/>
          </div>
          <input value={password} onChange={handlePasswordChange} type='password' placeholder="Password" className="w-60 outline-none border shadow-lg rounded-lg py-2 pl-10" />
        </div>
        {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
        <div className="flex justify-center">
          <button type='submit' className="border px-5 py-2 ml-4 w-60 bg-teal-500 text-white rounded-lg font-bold">Register</button>
        </div>
      </form>
      <p className="mx-auto text-center my-4">Already have an account? <Link to='/login' className="underline hover:text-teal-400">login</Link></p>
    </div>
  );
};

export default RegisterPage;