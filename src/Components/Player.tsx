import { useEffect, useRef, useState } from "react";
import { useSongData } from "../context/SongContext";
import { MoveLeft, MoveRight, Pause, Play } from "lucide-react";

const Player = () => {
  const {
    song,
    fetchSingleSong,
    selectedSong,
    isPlaying,
    setIsPlaying,
    prevSong,
    nextSong,
  } = useSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    fetchSingleSong();
  }, [selectedSong]);

  const [volume, setVolume] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }
    const handelLoadMetaData = () => {
      setDuration(audio.duration || 0);
    };
    const handelTimeUpdate = () => {
      setProgress(audio.currentTime || 0);
    };
    audio.addEventListener("loadedmetadata", handelLoadMetaData);
    audio.addEventListener("timeupdate", handelTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", handelLoadMetaData);
      audio.removeEventListener("timeupdate", handelTimeUpdate);
    };
  }, [song]);

  const handelPlayOrPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const volumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)/100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const durationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  return (
    <div>
      {song && (
        <div className="bg-black flex justify-between items-center h-1/10 text-white px-4">
          <div className=" lg:flex items-center gap-4 ">
            <img src={song.thumbnail} alt={song.title} className="w-12" />
            <div className="hidden md:block">
              <p>{song.title}</p>
              <p>{song.description?.slice(0, 30)}...</p>
            </div>
          </div>
          <div className=" flex flex-col m-auto items-center gap-1">
            {song.audio && (
              <audio
                ref={audioRef}
                src={song.audio}
                autoPlay={isPlaying}
              ></audio>
            )}
            <div className="w-full font-thin items-center flex text-green-400">
              <input
                type="range"
                name=""
                min={0}
                max={100}
                className="progress-bar w-[120px] md:w-[300px] "
                value={(progress / duration) * 100 || 0}
                onChange={durationChange}
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <span className=" cursor-pointer " onClick={prevSong}>
                <MoveLeft />
              </span>
              <button
                className="bg-white rounded-full p-2 text-black"
                onClick={handelPlayOrPause}
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <span className=" cursor-pointer " onClick={nextSong}>
                <MoveRight />
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="range"
              min={0}
              max={100}
              className="progress-bar w-[120px] md:w-[300px] "
              step={'0.1'}
              value={volume*100}
              onChange={volumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
