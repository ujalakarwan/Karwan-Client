import React, { useEffect, useState } from "react";
import Input from "../Components/UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import Card from "../Components/UI/Card";

import ReactToPrint from 'react-to-print';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";



const EditProduct = () => {
  const navigate = useNavigate();
  const  {productId}  = useParams();
  const {state}=useLocation()
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  console.log("da",state)
  const [User,setUser]=useState({name:"",contact:"",relation:""})
  



 
  return (
    <>
      <Card>
        <form
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Product Reviews</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            
            <Input
            disabled
              width="full"
              type="text"
              label="Name:"
              name="user.userName"
              value={state?.name}
            />
            
            <div className="flex items-center gap-2">
                  <p className=" text-[#404852]">Rating</p>
                  <p className=" text-[#404852] self-end">:</p>
                  <p className="text-primary font-semibold opacity-70">
                    {state?.rating}
                  </p>
                </div>
      
          {state?.reviews?.map((item,ind)=>(
            <div className="grid grid-cols-12 place-items-center text-center border ">
            <div className="col-span-8 lg:col-span-8 flex place-self-start text-left font-semibold text-primary">
              
              <div className="flex flex-col gap-2">
                <p>{item?.user_id?.userName}</p>
                <div className="flex items-center gap-2">
                  <p className=" text-[#404852]">Comment</p>
                  <p className=" text-[#404852] self-end">:</p>
                  <p className="text-primary font-semibold opacity-70">
                    {item?.comment}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className=" text-[#404852]">Rating</p>
                  <p className=" text-[#404852] self-end">:</p>
                  <p className="text-primary font-semibold opacity-70">
                    {item?.userRating}
                  </p>
                </div>
              </div>
            </div>
            
          </div>
            ))}
        
          
          
          </section>
          
          


          
         
        </form>
        
      </Card>
    </>
  );
};

export default EditProduct;
