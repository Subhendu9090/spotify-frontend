import { ArrowBigRight, Home, Library, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";
import { useUserData } from "../context/UserContext";

function Sidebar() {
  const navigate = useNavigate();
  const {user}=useUserData()
  return (
    <div className="w-1/4 h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Home className="w-6" />
          <p className=" font-bold">Home</p>
        </div>
        <div
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Search className="w-6" />
          <p className=" font-bold">Search</p>
        </div>
      </div>
      <div className="h-[85%] rounded bg-[#121212]">
        <div className="flex items-center justify-between p-4">
          <div className=" flex items-center gap-3 ">
            <Library className="w-6" />
            <p className=" font-bold">Your Library</p>
          </div>
          <div className=" flex items-center gap-3 ">
            <ArrowBigRight className="w-6" />
            <Plus className="w-6" />
          </div>
        </div>
        <div onClick={() => navigate("/playlist")}>
          <PlaylistCard />
        </div>
        <div className="p-4 m-2 rounded font-semibold flex flex-col items-start pl-4 mt-4 bg-[#121212]">
          <h1>Let's find some podcast to follow</h1>
          <p className="font-light">we'll keep you update on new episode</p>
          <button className="px-4 py-1 5 bg-white text-black text-[15px] mt-4 rounded-full">
            Browse Podcasts
          </button>
        </div>
        {user && user.role==="ADMIN"&&<button
          className="px-4 py-1 5 bg-white text-black text-[15px] mt-4 rounded-full  cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          Admin Dashboard
        </button>}
      </div>
    </div>
  );
}

export default Sidebar;
