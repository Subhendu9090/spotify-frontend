import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useUserData } from "./context/UserContext";
import Loading from "./Components/Loading";
import Register from "./pages/Register";
import Album from "./pages/Album";
import PlayList from "./pages/PlayList";
import Admin from "./pages/Admin";
import { useEffect } from "react";

const user_service = import.meta.env.VITE_USER_SERVICE_URI;
const song_service = import.meta.env.VITE_SONG_SERVICE_URI;
const admin_service = import.meta.env.VITE_ADMIN_SERVICE_URI;

function App() {
  const { loading, isAuth } = useUserData();
  const checkAllServices = async () => {
    try {
      await Promise.all([
        fetch(`${user_service}/check`),
        fetch(`${song_service}/check`),
        fetch(`${admin_service}/check`),
      ]);
    } catch (error) {
      console.log("Check", error);
    }
  };
  useEffect(() => {
    checkAllServices();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album/:id" element={<Album />} />
            <Route
              path="/playlist"
              element={isAuth ? <PlayList /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <Admin /> : <Login />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
