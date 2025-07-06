import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast, { Toaster } from "react-hot-toast";

const server =import.meta.env.VITE_USER_SERVICE_URI;

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  playList: string[];
}

interface UserContextType {
  user: User | null;
  isAuth: boolean;
  loading: boolean;
  loginUser: (
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  registerUser: (
    name:string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) => Promise<void>;
  logout:()=>Promise<void>;
  btnLoading: boolean;
  addToPlaylist:(id:string)=>Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  async function registerUser(
    name:string,
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/register`, {
        name,
        email,
        password,
      });
      console.log(data)
      toast.success(data.message);
      localStorage.setItem("token", data.data.token);
      setUser(data.data);
      setIsAuth(true)
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occured");
    } finally {
      setBtnLoading(false);
    }
  }

  async function loginUser(
    email: string,
    password: string,
    navigate: (path: string) => void
  ) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
        email,
        password,
      });
      console.log(data)
      toast.success(data.message);
      localStorage.setItem("token", data.data.token);
      setUser(data.data);
      setIsAuth(true);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occured");
    } finally {
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUser(data.data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function addToPlaylist(id:string){
    try {
      const {data}= await axios.get(`${server}/api/v1/song/${id}`,{
        headers:{
          token:localStorage.getItem("token")
        }
      })
      toast.success(data.message);
      fetchUser()
    } catch (error:any) {
      toast.error(error.response?.data?.message || "An Error Occured")
    }
  }

  async function logout(){
    localStorage.clear();
    setUser(null);
    setIsAuth(false);
    toast.success("User Logged Out")
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, isAuth, btnLoading, loginUser ,registerUser,logout,addToPlaylist}}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserData must ne used within a userProvider");
  }
  return context;
};
