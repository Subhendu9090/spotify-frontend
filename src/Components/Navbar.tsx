import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuth ,logout} = useUserData();
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="w-8 bg-black rounded-2xl cursor-pointer p-2"
            onClick={() => navigate(-1)}
          />
          <ArrowRight
            className="w-8 bg-black rounded-2xl cursor-pointer p-2"
            onClick={() => navigate(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="px-4 py-1 bg-white text-black text-[15px] rounded-full cursor-pointer hidden md:block">
            Explore Premium
          </p>
          <p className="px-4 py-1 bg-white text-black text-[15px] rounded-full cursor-pointer hidden md:block">
            Install
          </p>

          {isAuth ? (
            <p className="px-4 py-1 bg-white text-black text-[15px] rounded-full cursor-pointer hidden md:block" onClick={logout}>
              Logout
            </p>
          ) : (
            <p
              className="px-4 py-1 bg-white text-black text-[15px] rounded-full cursor-pointer hidden md:block"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          )}
        </div>
      </div>
      <div className=" flex items-center gap-2 mt-4">
        <p className="px-4 py-1 bg-white text-black rounded-2xl cursor-pointer">
          All
        </p>
        <p className="px-4 py-1 bg-white text-black rounded-2xl cursor-pointer hidden md:block">
          Music
        </p>
        <p className="px-4 py-1 bg-white text-black rounded-2xl cursor-pointer hidden md:block">
          Podcasts
        </p>
        <p
          className="px-4 py-1 bg-white text-black rounded-2xl cursor-pointer md:hidden"
          onClick={() => navigate("/playlist")}
        >
          Playlist
        </p>
      </div>
    </>
  );
}

export default Navbar;
