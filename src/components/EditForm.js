import { useContext, useEffect, useState } from "react";
import { ProdContext } from "./ProdContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const EditForm =()=>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState({title:"", description:"", price:""})
    const {formData} = useContext(ProdContext);
    const {updateData} = useContext(ProdContext);
    const data= {title, description, price};
    const navigate = useNavigate();
    const handleCancel=()=>{
      navigate("/");
    }
    useEffect(()=>{
      setTitle(formData.title);
      setDescription(formData.description);
      setPrice(formData.price);
    },[formData]);
    const handleUpdateandSave = async(e,id,data) => {
      e.preventDefault();
      const isValid = validateValues(data);
      if(isValid){
        try{
        await updateData(id, data);
        navigate("/");
        toast.success("updated successfully");
      }
      catch(e){
        toast.error("Error occured");
      }
    }
    }
    function validateValues(data){
      let newErrors = {};
      const {title, description, price} = data;
      if (title.length === 0) {
        newErrors = {...newErrors, title: "This field is required"};
      }
      if (description.length === 0) {
        newErrors = {...newErrors, description: "This field is required"};
      }
      if (price.length === 0) {
        newErrors = {...newErrors, price: "This field is required"};
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length===0;
    }
  return (
    <div className="w-screen h-screen flex items-center justify-center">
    <form onSubmit={(e)=>handleUpdateandSave(e, formData.id, data)} className="flex flex-col border border-blue-800 p-10 rounded">
    <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
    <label htmlFor='title' className="text-blue-800 text-xl mb-2">Title</label>
    <input type='text' id="title" value={title} onChange={(e)=>setTitle(e.target.value)} className="border-b-2 border-gray-500 focus:border-blue-500 outline-none mb-1"></input>
    {errors.title? <p className="text-red-700 text-sm"><sup>*</sup>This field is required</p>:""}
    <label htmlFor='desc' className="text-blue-800 text-xl mb-2">Description</label>
    <textarea id="desc" value={description} rows={1} onChange={(e)=>setDescription(e.target.value)} className="border-b-2 border-gray-500 focus:border-blue-500 outline-none mb-1"></textarea>
    {errors.description? <p className="text-red-700 text-sm"><sup>*</sup>This field is required</p>:""}
    <label htmlFor='price' className="text-blue-800 text-xl mb-2">Price</label>
    <input type='number' id="price" value={price} onChange={(e)=>setPrice(e.target.value)} className="border-b-2 border-gray-500 focus:border-blue-500 outline-none mb-1"></input>
    {errors.price? <p className="text-red-700 text-sm"><sup>*</sup>This field is required</p>:""}
    <button className="bg-blue-800 text-white p-2 my-2">Update</button>
    <button className="bg-blue-800 text-white p-2 my-2" onClick={handleCancel}>Cancel</button>
    </form>
    <ToastContainer/>
</div>
    )
  }
  export default EditForm;