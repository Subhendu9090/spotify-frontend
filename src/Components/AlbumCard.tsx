import { useNavigate } from "react-router-dom";

interface AlbumCardProps {
  image: string;
  name: string;
  desc: string;
  id: string;
}
const AlbumCard: React.FC<AlbumCardProps> = ({ image, name, desc, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className=" min-w-[180px] p-2 px-3 cursor-pointer hover:bg-[#ffffff26]"
      onClick={() => navigate("/album/" + id)}
    >
      <img src={image} alt="" className="rounded w-[160px]" />
      <p className="font-bold mt-2 mb-1">{name.slice(0, 12)}...</p>
      <p className="text-sm text-slate-200">{desc.slice(0, 18)}...</p>
    </div>
  );
};

export default AlbumCard;
