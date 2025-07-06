import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useSongData, type Song } from "../context/SongContext";
import { useUserData } from "../context/UserContext";
import Loading from "../Components/Loading";
import { BookMarked, Play } from "lucide-react";

function PlayList() {
  const { user, addToPlaylist } = useUserData();
  const { songs, setIsPlaying, setSelectedSong, loading } = useSongData();

  const [myPlayList, setMyPlayList] = useState<Song[]>([]);

  useEffect(() => {
    if (songs && user?.playList) {
      const filteredSongs = songs.filter((song) =>
        user.playList.includes(song.id.toString())
      );
      console.log(filteredSongs)
      setMyPlayList(filteredSongs);
    }

  }, [songs, user]);

  return (
    <div>
      <Layout>
        <div>
          {myPlayList && (
            <>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrE3V2cNufDuOGVmWa25vD9RPL3Ej8exlcQ&s"
                      alt=""
                      className="h-48 rounded w-48"
                    />

                    <div className="flex flex-col">
                      <div>PlayList</div>
                      <h2 className=" text-3xl font-bold mb-4 md:text-5xl">
                        {user?.name} PlayList
                      </h2>
                      <h4 className="text-xl">Your Favorite Songs</h4>
                      <p className="mt-1">
                        <img
                          src="/logo.png"
                          alt=""
                          className="w-6 inline-block"
                        />
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                    <p className=" hidden sm:block">
                      <b className="mr-4">#</b>
                    </p>
                    <p>Description</p>
                    <p className="text-center">Actions</p>
                  </div>
                  <hr />
                  {myPlayList &&
                    myPlayList.map((song, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                        >
                          <p className="text-white">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img
                              src={song.thumbnail}
                              alt=""
                              className="inline w-10 mr-5"
                            />
                            {song.title}
                          </p>
                          <p className="text-[15px] hidden sm:block">
                            {song.description.slice(0, 30)}
                          </p>
                          <p className="flex justify-center items-center gap-2">
                            <button
                              className=" text-center text-[15px]"
                              onClick={() => {
                                setSelectedSong(song.id);
                                setIsPlaying(true);
                              }}
                            >
                              <Play />
                            </button>

                            <button
                              className=" text-center text-[15px]"
                              onClick={() => {
                                addToPlaylist(song.id);
                              }}
                            >
                              <BookMarked />
                            </button>
                          </p>
                        </div>
                      );
                    })}
                </>
              )}
            </>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default PlayList;
