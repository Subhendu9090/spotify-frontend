import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../context/UserContext";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useSongData } from "../context/SongContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Delete } from "lucide-react";

const server = import.meta.env.VITE_ADMIN_SERVICE_URI;

function Admin() {
  const navigate = useNavigate();
  const { user } = useUserData();

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate]);
  const { albums, songs, fetchAlbums, fetchSongs } = useSongData();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const fileChangeHandeler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const addAlbumHandeler = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    setBtnLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/v1/album/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token") || "",
        },
        withCredentials: true,
      });
      toast.success(data.message);
      fetchAlbums();
      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error: any) {
      console.error("Error details:", error);
      toast.error(error.response.data?.message || "Server error occurred");
    } finally {
      setBtnLoading(false);
    }
  };

  const addSongHandeler = async (e: any) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("album", album);
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/songs/new`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token") || "",
        },
        withCredentials: true,
      });
      toast.success(data.message);
      fetchSongs();
      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error: any) {
      console.error("Error details:", error);
      toast.error(error.response.data?.message || "Server error occurred");
    } finally {
      setBtnLoading(false);
    }
  };

  const addThumnailHandeler = async (id: string) => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/v1/songs/add-thumbnail/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token") || "",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      fetchSongs();
      // Reset form
      setFile(null);
    } catch (error: any) {
      console.error("Error details:", error);
      toast.error(error.response.data?.message || "Server error occurred");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteAlbum = async (id: string) => {
    if (confirm("Are you Sure you Want to delete is Album")) {
      setBtnLoading(true);
      try {
        const { data } = await axios.delete(`${server}/api/v1/album/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message)
        fetchSongs()
        fetchAlbums()

      } catch (error: any) {
        console.error("Error details:", error);
        toast.error(error.response.data?.message || "Server error occurred");
      } finally {
        setBtnLoading(false);
      }
    }
  };

  const deleteSong = async (id: string) => {
    if (confirm("Are you Sure you Want to delete this Song")) {
      setBtnLoading(true);
      try {
        const { data } = await axios.delete(`${server}/api/v1/song/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message)
        fetchSongs()
      } catch (error: any) {
        console.error("Error details:", error);
        toast.error(error.response.data?.message || "Server error occurred");
      } finally {
        setBtnLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] text-white p-8">
      <Link
        to={"/"}
        className="bg-green-500 py-2 px-4  text-white font-bold rounded-full"
      >
        Go To Home Page
      </Link>

      <h2 className="text-2xl font-bold mt-6 mb-6">Add Album</h2>
      <form
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex-col items-center flex gap-4 justify-center"
        onSubmit={addAlbumHandeler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="auth-input"
          placeholder="Choose Thumbnail"
          onChange={fileChangeHandeler}
          required
          accept="image/*"
        />
        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnLoading}
        >
          {btnLoading ? "Please Wait..." : "Add"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-6 mb-6">Add Song</h2>
      <form
        className="bg-[#181818] p-6 rounded-lg shadow-lg flex-col items-center flex gap-4 justify-center"
        onSubmit={addSongHandeler}
      >
        <input
          type="text"
          placeholder="Title"
          className="auth-input"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="auth-input"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
        >
          <option value="">Choose Album</option>
          {albums.map((data: any, i: number) => (
            <option key={i} value={data.id}>
              {data.title}
            </option>
          ))}
        </select>
        <input
          type="file"
          className="auth-input"
          placeholder="Choose Audio"
          onChange={fileChangeHandeler}
          required
          accept="audio/*"
        />
        <button
          className="auth-btn"
          style={{ width: "100px" }}
          disabled={btnLoading}
        >
          {btnLoading ? "Please Wait..." : "Add"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Albums</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {albums?.map((e, i) => (
            <div className="p-4 bg-[#181818] rounded-lg shadow-md" key={i}>
              <img className="mr-1 w-52 h-52" src={e.thumbnail} alt="" />
              <h4 className="text-lg font-bold">{e.title.slice(0, 30)}</h4>
              <h4 className="text-lg font-bold">
                {e.description.slice(0, 20)}...
              </h4>
              <button
                disabled={btnLoading}
                className="px-3 py-1 bg-red-500 text-white rounded "
                onClick={()=>  deleteAlbum(e.id) }
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Added Songs</h3>
        <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
          {songs?.map((e, i) => (
            <div className="p-4 bg-[#181818] rounded-lg shadow-md" key={i}>
              {e.thumbnail ? (
                <img className="mr-1 w-52 h-52" src={e.thumbnail} alt="" />
              ) : (
                <div className="flex flex-col justify-center items-center gap-2">
                  <input type="file" onChange={fileChangeHandeler} />
                  <button
                    disabled={btnLoading}
                    className="auth-btn"
                    onClick={() => addThumnailHandeler(e.id)}
                  >
                    Add Thumbnail
                  </button>
                </div>
              )}
              <h4 className="text-lg font-bold">{e.title.slice(0, 30)}</h4>
              <h4 className="text-lg font-bold">
                {e.description.slice(0, 20)}...
              </h4>
              <button
                disabled={btnLoading}
                className="px-3 py-1 bg-red-500 text-white rounded "
                onClick={()=> deleteSong(e.id)}
              >
                <Delete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
