import { Music } from "lucide-react";
import { useUserData } from "../context/UserContext";

function PlaylistCard() {
  const { isAuth, user } = useUserData();
  return (
    <div className=" flex items-center rounded-lg cursor-pointer p-4 shadow-md hover:bg-[#ffffff26]">
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-600">
        <Music className="text-gray-400 text-xl" />
      </div>
      <div className="ml-4">
        <h2>My PlayList</h2>
        <p className="text-sm text-gray-400">
          PlayList •{" "}
          {isAuth ? <span>{user?.name}</span> : <span>{"User"}</span>}
        </p>
      </div>
    </div>
  );
}

export default PlaylistCard;
