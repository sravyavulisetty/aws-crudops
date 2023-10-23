import React,{useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { ProdContext } from './ProdContext';
import { BiPlus } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import { FiEye } from "react-icons/fi";
const Main = () => {
   const {products} = useContext(ProdContext);
   const {getallProd, formData} = useContext(ProdContext);
   const {handleView} = useContext(ProdContext);
   const {handleUpdate} = useContext(ProdContext);
   const {handleDelete} =useContext(ProdContext);
   const {isModalOpen, closeModal} = useContext(ProdContext);

   useEffect(()=>{
    getallProd();
   },[])
  return (
    <div className='w-screen h-screen flex flex-col justify-start'>
        <div className='flex items-left w-full justify-start mx-10 mt-10'>
            <Link to="/productform" className='bg-green-700 p-2 rounded'><div className='flex flex-row'><BiPlus size={30}/><h1 className='text-xl'>Add Product</h1></div></Link>
        </div>
        <table className='m-10'>
            <thead>
                <tr>
                    <th className='border-b p-2'>Title</th>
                    <th className='border-b p-2'>Description</th>
                    <th className='border-b p-2'>Price</th>
                    <th className='border-b p-2'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product)=>(
                    <tr key={product.id}>
                    <td className='border-b p-2 text-center'>{product.title}</td>
                    <td className='border-b p-2 text-center'>{product.description}</td>
                    <td className='border-b p-2 text-center'>{product.price}</td>
                    <td className='border-b p-2 text-center'>
                        <div>
                            <button className="mr-2" onClick={()=>handleView(product)}><FiEye color="blue" size={25}/></button>
                            <Link to="/editproduct"><button className="mx-2" onClick={()=>handleUpdate(product)}><BiEdit size={25} color='orange'/></button></Link>
                            <button className="mx-2" onClick={()=>handleDelete(product.id)}><MdDelete size={25} color='red'/></button>
                        </div>
                    </td>
                </tr>
                ))}
                
            </tbody>
        </table>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4">Product Info</h1>
            <p className="text-xl mb-2">{formData.title}</p>
            <p className='text-xl mb-2'>Description:{formData.description}</p>
            <p className='text-xl mb-2'>Price:{formData.price}</p>
            <button onClick={closeModal} className="mt-4 bg-gray-500 text-white p-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Main;
