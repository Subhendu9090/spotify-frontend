import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useUserData } from "../context/UserContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("")
  const navigate=useNavigate()
  const {registerUser,btnLoading}=useUserData();

  async function submitHandeler(e:any) {
    e.preventDefault();
    registerUser(name,email,password,navigate)
  }

  return (
    <div className=" flex items-center justify-center max-h-screen h-screen">
      <div className="p-8 shadow-lg max-w-md w-full text-white  bg-black">
        <h2 className="text-center text-3xl font-semibold mb-8">
          Register To Spotify
        </h2>
        <form className="mt-8" onSubmit={submitHandeler}>
          <div className="mb-4">
            <label className="block text-sm font-md">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-md">Enter Email</label>
            <input
              type="email"
              placeholder="Email or Username"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-md">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="auth-btn" disabled={btnLoading} >{btnLoading?"Please Wait...":"Register"}</button>
        </form>
        <div className="text-center mt-6">
          <Link to={"/login"} className="text-sm text-gray-400 hover:text-gray-300">
             have an account?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
