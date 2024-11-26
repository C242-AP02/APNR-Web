import { FaHome, FaImage, FaCamera, FaVideo, FaList } from "react-icons/fa";

export const menuItems = [
  { name: "Dashboard", icon: <FaHome />, url: "/dashboard", title: "Dashboard" },
  { name: "Image", icon: <FaImage />, url: "/image", title: "Upload Image" },
  { name: "Video", icon: <FaVideo />, url: "/video", title: "Upload Video" },
  { name: "Camera", icon: <FaCamera />, url: "/camera", title: "Real Time Camera" },
  { name: "List", icon: <FaList />, url: "/list", title: "Vehicle List" },
];
