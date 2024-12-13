"use client";

import { useState, useEffect, useCallback } from "react";
import { FaCalendar, FaMapMarkerAlt, FaCar, FaArrowLeft, FaPaperclip, FaLock } from "react-icons/fa";
import { MdDelete, MdPublic } from "react-icons/md";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { BACKEND_URL } from "@/constant/configuration";
import Link from "next/link";
import StatusBox from "@/components/StatusBox";
import ConfirmationModal from "@/components/ConfirmationModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import LoadingSpinner from "@/components/LoadingSpinner";
import { UserAuth } from "@/context/authContext";

export default function VehicleDetail() {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPublicConfirmation, setShowPublicConfirmation] = useState(false);
  const [showPrivateConfirmation, setShowPrivateConfirmation] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();
  const { user } = UserAuth();
  const currentPath = usePathname();
  const isListPath = currentPath.split("/")[1] === "list"
  const apiEndpoint = isListPath ? "get-vehicle-details" : "get-public-details"

  const fetchVehicle = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/${apiEndpoint}/${params.id}`, {
        method: "GET",
        credentials: "include"
      });
  
      if (response.status === 401) {
        throw new Error("You are not authenticated. Please log in.");
      }
  
      if (response.status === 403) {
        throw new Error("You do not have permission to view this vehicle detail.");
      }
  
      if (!response.ok) {
        throw new Error("Failed to fetch vehicle details.");
      }
  
      const data = await response.json();
      setVehicle(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [params.id, apiEndpoint]);
  
  useEffect(() =>  {
    fetchVehicle();
  }, [fetchVehicle, user?.uid])

  if (loading) {
    return (
      <div className="w-full p-6 flex justify-center">
        <StatusBox message={"Loading vehicle data..."} color="blue-500"/>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full p-6 flex justify-center">
        <StatusBox message={`Error: ${error}`} color={"red-500"} />
      </div>
    );
  }
  
  const handleDelete = async (confirm) => {
    setShowDeleteConfirmation(false);

    if(confirm){
      setDeleteLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/delete-vehicle/${params.id}`, {
          method: "DELETE",
          credentials: "include"
        });
  
        if (!response.ok) {
          throw new Error("Failed to delete vehicle details.");
        }
        NProgress.start();
        router.replace("/list");
        toast.success("Vehicle details deleted successfully")
      } catch (error) {
        toast.error(error.message);
      } finally {
        setDeleteLoading(false);
      }
    }
  }

  const handleMakePublic = async (confirm) => {
    setShowPublicConfirmation(false);

    if(confirm){
      setDeleteLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/set-details-public/${params.id}`, {
          method: "PATCH",
          credentials: "include"
        });
  
        if (!response.ok) {
          throw new Error("Failed to make public");
        }
        NProgress.start();
        router.refresh();
        fetchVehicle(); 
        toast.success("Vehicle details successfully set to public")
      } catch (error) {
        toast.error(error.message);
      } finally {
        setDeleteLoading(false);
      }
    }
  }

  const handleMakePrivate = async (confirm) => {
    setShowPrivateConfirmation(false);

    if(confirm){
      setDeleteLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/set-details-private/${params.id}`, {
          method: "PATCH",
          credentials: "include"
        });
  
        if (!response.ok) {
          throw new Error("Failed to make private");
        }
        NProgress.start();
        router.refresh();
        fetchVehicle(); 
        toast.success("Vehicle details deleted set to private")
      } catch (error) {
        toast.error(error.message);
      } finally {
        setDeleteLoading(false);
      }
    }
  }

  const formattedDate = new Date(vehicle.timestamp).toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full p-6 flex justify-center">
      <div className="relative bg-white p-4 sm:p-8 rounded-lg border max-w-6xl w-full">
        
        {!!vehicle.isPublic && (
          <div className="absolute p-1 top-0 right-0">
            <div className="px-2 py-1 bg-green-200 text-green-700 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
              public
            </div>
          </div>
        )}

        {isListPath && (
          <div className="mb-3 flex items-center">
            <Link href="/list">
              <div className="flex items-center text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <FaArrowLeft className="mr-2" />
                Back
              </div>
            </Link>
          </div>
        )}
        
        <h1 className="text-3xl font-bold text-indigo-900 mb-8 text-center">
          Vehicle Details
        </h1>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Vehicle Image Section */}
          <div className="flex-shrink-0 w-full md:w-3/5">
            <Image
              src={vehicle.imageUrl}
              alt={`Detection of ${vehicle.plateNumber}`}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>

        {/* Vehicle Information Section */}
          <div className="w-full md:w-2/5">
            <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Vehicle Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaCar className="text-blue-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Plate Number</p>
                    <p className="font-bold text-base">{vehicle.plateNumber}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-red-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Region</p>
                    <p className="font-bold text-base">{vehicle.region}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <FaCalendar className="text-green-500 text-lg" />
                  <div>
                    <p className="text-gray-500 text-sm">Date and Time</p>
                    <p className="font-bold text-base">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {isListPath && (
              <div className="mt-5 w-full flex justify-center gap-2">
                <button 
                  className="flex items-center text-white bg-red-600 hover:bg-red-7 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 gap-2" 
                  onClick={() => {
                    setShowDeleteConfirmation(true);
                  }}  
                >
                  <MdDelete size={20}/> Delete
                </button>

                {!!vehicle.isPublic && (
                  <div className="flex gap-2">
                    <button 
                      className="flex items-center text-white bg-green-600 hover:bg-red-7 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 gap-2" 
                      onClick={() => {
                        setShowPrivateConfirmation(true);
                      }}  
                    >
                      <FaLock size={20}/> Make Private
                    </button>

                    <button 
                      className="flex items-center text-white bg-blue-600 hover:bg-red-7 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 gap-2" 
                      onClick={async() => {
                        const currentUrl = window.location.href.replace('list', 'public');
                        await navigator.clipboard.writeText(currentUrl);
                        toast.success("Link Copied to Clipboard");
                      }}  
                    >
                      <FaPaperclip size={20}/> Share
                    </button>
                  </div>
                )}

                {!vehicle.isPublic && (
                  <button 
                    className="flex items-center text-white bg-green-600 hover:bg-red-7 py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 gap-2" 
                    onClick={() => {
                      setShowPublicConfirmation(true);
                    }}  
                  >
                    <MdPublic size={20}/> Make Public
                  </button>
                )}
                
              </div>
            )}

          </div>
        </div>
      </div>

      {showDeleteConfirmation && 
        <ConfirmationModal handleConfirm={handleDelete} message={"Are you sure want to delete this data?"} />
      }

      {showPublicConfirmation && 
        <ConfirmationModal handleConfirm={handleMakePublic} message={"Are you sure want to make it public"} />
      }

      {showPrivateConfirmation && 
        <ConfirmationModal handleConfirm={handleMakePrivate} message={"Are you sure want to make it private"} />
      }

      {deleteLoading && 
        <LoadingSpinner overlay />
      }
    </div>
  );
}
