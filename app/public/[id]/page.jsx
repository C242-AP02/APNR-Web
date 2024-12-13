import VehicleDetail from "../../list/[id]/page";

export default function Public(){
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">
            <VehicleDetail />
        </div>
    )
}