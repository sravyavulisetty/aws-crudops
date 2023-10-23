import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const ProdContext = createContext();

const ProdProvider = ({children})=>{
   const [products, setProducts] = useState([]);
   const [isModalOpen, setModalOpen] = useState(false);
   const [formData, setformData] = useState({});
   let navigate = useNavigate();
   //getAllProducts
   const getallProd = async () => {
    await fetch('http://localhost:8080/getAllProducts',{
        method: "GET",
        headers:{accept: "application/json"}
    })
    .then((response) => response.json())
    .then(data=> setProducts(data))
    .catch((e)=>console.log(e))
   }
   //Adding Products
   const postData = async (data)=>{
    try{
      const {title, description, price} =data;
      const response = await axios.post("http://localhost:8080/addProduct",{title, description, price})
      return response.data;
}
  catch(e){
    throw e;
  }
}
  //View Product
  async function handleView(product){
    setModalOpen(true);
    try{
      await axios.get("http://localhost:8080/getProductDetails?id="+ product.id)
    .then((response) => {
      console.log(response);
    });
    setformData(product);
  }
  catch(e){
    console.log(e);
  }
}
  const closeModal=()=>{
  setModalOpen(false);
  }
  //Update Product
  async function handleUpdate(product){
    setformData({...product});
  }
  async function updateData(id,data){
    try{
    const {title, description, price} = data;
    const response = await axios.post("http://localhost:8080/updateProductDetails",{id, title, description, price})
    return response.data
  }
  catch(e){
    console.log(e);
  }
}
//Delete Product
  async function handleDelete(id){
    if(window.confirm("Are you sure you want to delete?")){
      try{
        await axios.delete("http://localhost:8080/deleteProduct?id="+ id)
        setProducts((prevData) => prevData.filter(product => product.id !== id));
      }
      catch(e){
      console.log(e);
    }
    
  }
  else{
    navigate("/");
  }
  }

    return (
        <ProdContext.Provider value={{getallProd , products, postData, handleView, handleUpdate, updateData, formData, handleDelete, isModalOpen, closeModal}}>
            {children}
        </ProdContext.Provider>
    )

}
export {ProdContext, ProdProvider}