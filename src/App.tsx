import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useUserData } from "./context/UserContext";
import Loading from "./Components/Loading";
import Register from "./pages/Register";
import Album from "./pages/Album";
import PlayList from "./pages/PlayList";
import Admin from "./pages/Admin";

function App() {
  const { loading, isAuth } = useUserData();
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
