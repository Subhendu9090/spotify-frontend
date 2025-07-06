import AlbumCard from "../Components/AlbumCard";
import Layout from "../Components/Layout";
import Loading from "../Components/Loading";
import SongCard from "../Components/SongCard";
import { useSongData } from "../context/SongContext";

function Home() {
  const { albums, songs, loading } = useSongData();

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="mb-4">
            <h1 className=" my-5 font-bold text-2xl">Featured Card</h1>
            <div className=" flex overflow-auto">
              {albums?.map((e, i) => {
                return (
                  <AlbumCard
                    key={i}
                    image={e.thumbnail}
                    id={e.id}
                    desc={e.description}
                    name={e.title}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <h1 className=" my-5 font-bold text-2xl">Todays Biggest hits</h1>
            <div className=" flex overflow-auto">
              {songs?.map((e, i) => {
                return (
                  <SongCard
                    key={i}
                    image={e.thumbnail}
                    id={e.id}
                    desc={e.description}
                    name={e.title}
                  />
                );
              })}
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
}

export default Home;
