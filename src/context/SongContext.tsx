import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const server = import.meta.env.VITE_SONG_SERVICE_URI;

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}
export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface songContextType {
  songs: Song[];
  isPlaying: boolean;
  loading: boolean;
  setIsPlaying: (value: boolean) => void;
  selectedSong: string | null;
  setSelectedSong: (id: string) => void;
  albums: Album[];
  fetchSingleSong: () => Promise<void>;
  song: Song | null;
  nextSong: () => void;
  prevSong: () => void;
  albumSong:Song[];
  albumData:Album | null;
  fetchAlbumSong:(id:string)=>Promise<void>;
  fetchSongs:()=>Promise<void>;
  fetchAlbums:()=>Promise<void>;
}

const SongContext = createContext<songContextType | undefined>(undefined);

interface SongProviderProps {
  children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [albums, setAlbums] = useState<Album[]>([]);

  const [song, setSong] = useState<Song | null>(null);

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/v1/song/all`);
      setSongs(data);
      if (data.length > 0) {
        setSelectedSong(data[0].id.toString());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSingleSong = useCallback(async () => {
    if (!selectedSong) {
      return;
    }
    try {
      const { data } = await axios.get<Song>(
        `${server}/api/v1/song/${selectedSong}`
      );
      setSong(data);
    } catch (error) {
      console.log(error);
    }
  }, [selectedSong]);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<Album[]>(`${server}/api/v1/album/all`);
      setAlbums(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [index, setIndex] = useState<number>(0);

  const nextSong = useCallback(() => {
    if (index === songs.length - 1) {
      setIndex(0);
      setSelectedSong(songs[0]?.id.toString());
    } else {
      setIndex((prev) => prev + 1);
      setSelectedSong(songs[index + 1]?.id?.toString());
    }
  }, [index, songs]);

  const prevSong = useCallback(() => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelectedSong(songs[index - 1]?.id.toString());
    }
  }, [index, songs]);

  const [albumSong, setAlbumSong] = useState<Song[]>([]);
  const [albumData, setAlbumData] = useState<Album | null>(null);

  const fetchAlbumSong = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ songs: Song[]; album: Album }>(
        `${server}/api/v1/album/${id}`
      );

      setAlbumData(data.album);
      setAlbumSong(data.songs);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <SongContext.Provider
      value={{
        songs,
        selectedSong,
        setSelectedSong,
        isPlaying,
        setIsPlaying,
        loading,
        albums,
        song,
        fetchSingleSong,
        prevSong,
        nextSong,
        albumData,
        albumSong,
        fetchAlbumSong,
        fetchAlbums,
        fetchSongs
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSongData = () => {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("Use Song data must be user within the a song provider");
  }
  return context;
};
