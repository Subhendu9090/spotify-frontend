import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import { useSongData } from "../context/SongContext";
import { useEffect } from "react";
import Loading from "../Components/Loading";
import { BookMarked, Play } from "lucide-react";
import { useUserData } from "../context/UserContext";

function Album() {
  const {
    fetchAlbumSong,
    albumData,
    setIsPlaying,
    setSelectedSong,
    loading,
    albumSong,
  } = useSongData();

  const {isAuth,addToPlaylist} = useUserData()

  const params = useParams<Record<string, string | undefined>>();
  useEffect(() => {
    if (params?.id) {
      fetchAlbumSong(params?.id);
    }
  }, [params?.id]);
  return (
    <Layout>
      <div>
        {albumData && (
          <>
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                  {albumData.thumbnail && (
                    <img
                      src={albumData.thumbnail}
                      alt=""
                      className="w-48 rounded"
                    />
                  )}
                  <div className="flex flex-col">
                    <div>PlayList</div>
                    <h2 className=" text-3xl font-bold mb-4 md:text-5xl">
                      {albumData.title} PlayList
                    </h2>
                    <h4 className="text-xl">{albumData.description}</h4>
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
                {albumSong &&
                  albumSong.map((song, index) => {
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
                          <button className=" text-center text-[15px]"
                            onClick={()=>{
                              setSelectedSong(song.id);
                              setIsPlaying(true)
                            }}
                          >
                            <Play />
                          </button>
                          {isAuth&&<button className=" text-center text-[15px]" onClick={()=>{
                            addToPlaylist(song.id)
                          }}>
                            <BookMarked />
                          </button>}
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
  );
}

export default Album;
