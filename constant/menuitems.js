import { FaHome, FaImage, FaCamera, FaVideo, FaList } from "react-icons/fa";

export const menuItems = [
  { name: "Dashboard", icon: <FaHome size={24}/>, url: "/dashboard", title: "Dashboard" },
  { name: "Image", icon: <FaImage size={24} />, url: "/image", title: "Upload Image" },
  // { name: "Video", icon: <FaVideo />, url: "/video", title: "Upload Video" },
  // { name: "Camera", icon: <FaCamera />, url: "/camera", title: "Real Time Camera" },
  { name: "List", icon: <FaList size={24} />, url: "/list", title: "Vehicle List" },
  { name: "", url: "/list/:id", title: "Vehicle Details" },

];
