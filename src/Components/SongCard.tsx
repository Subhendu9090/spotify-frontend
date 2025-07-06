import {  BookMarked, Play } from "lucide-react";
import type React from "react";
import { useUserData } from "../context/UserContext";
import { useSongData } from "../context/SongContext";

interface SongCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}
const SongCard: React.FC<SongCardProps> = ({ image, name, desc, id }) => {

  const {addToPlaylist,isAuth} = useUserData();
  const {setSelectedSong,setIsPlaying}=useSongData()

  const saveToPlayListHandeler=()=>{
    addToPlaylist(id)
  }

  return (
    <div className=" min-w-[180px] p-2 px-3 cursor-pointer hover:bg-[#ffffff26]">
      <div className=" relative group ">
        <img
          src={
            image ??
            "https://static.vecteezy.com/system/resources/thumbnails/024/295/098/small_2x/music-notes-background-illustration-ai-generative-free-photo.jpg"
          }
          alt={name}
          className="mr-1 w-[160px] rounded"
        />
        <div className="flex gap-2">
          <button className="absolute bottom-2 right-14 text-black p-2 rounded-full group-hover:opacity-100 transition opacity-0 duration-300 bg-green-500" onClick={()=>{
            setSelectedSong(id);
            setIsPlaying(true)
          }}>
            <Play />
          </button>
         {isAuth && <button className="absolute bottom-2 right-2 text-black rounded-full p-2 group-hover:opacity-100 transition opacity-0 duration-300 bg-green-500" onClick={saveToPlayListHandeler}>
            <BookMarked />
          </button>}
        </div>
      </div>
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="font-bold text-slate-200 mt-2 text-sm mb-1">
        {desc.slice(0, 20)}...
      </p>
    </div>
  );
};

export default SongCard;
