import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api-client"
import ManageHotelForm from "../forms/ManagHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = ()=>{
    const {showToast} = useAppContext();
    const { id } = useParams();
    const {data:hotel} = useQuery("fetchMyHotelById",()=>apiClient.fetchMyHotelById(id || ""),{
        enabled:!!id,
    })

    const {mutate,isLoading} = useMutation(apiClient.updatedHotelById,{
        onSuccess:()=>{
            showToast({message:"Hotel Saved",type:"SUCCESS"})
        },
        onError:()=>{
            showToast({message:"Error Saving Hotel",type:"ERROR"})
        }
    })

    const handleSave = (hotelFormData: FormData) =>{
        mutate(hotelFormData);
    }
    return <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
}

export default EditHotel