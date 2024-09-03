import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';


const ItemContext = createContext()

export const ItemContextProvider = ({children}) =>{

    const [itemList,setItemList] = useState([])
    useEffect(()=>{
        getItem()
    },[])

    const getItem = async() =>{
        try {
            const reponse = await axios.get('http://localhost:5000/api/getAllData')
            setItemList(reponse.data.data)
        } catch (error) {
           console.log('Error in adding Item',error); 
        }
    }

    const addItem = async (values) => {
        
        const formData = new FormData();
        formData.append('image', values.image); 
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('quantity', values.quantity);
        formData.append('price', values.price);
        formData.append('date', values.date);
    
        
        try {
            const response = await axios.post('http://localhost:5000/api/addItem', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success(response.data.message);
            getItem(); // Call to refresh items
        } catch (error) {
            console.log('Error in adding Item', error);
            toast.error('Error in adding item');
        }
    }
    

   
    return(
        <ItemContext.Provider value={{addItem,itemList}}>
            {children}
        </ItemContext.Provider>
    )
}

export const useItemContext = () => useContext(ItemContext)