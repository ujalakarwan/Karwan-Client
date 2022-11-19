import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Select from "../UI/Select";
import hotelService from '../../api/hotelService.api'
const AllProductsItems = ({ product, productCart, setProductCart }) => {
  let navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  console.log(product && product);
  const checkin=new Date(product?.BookedCheckin)
  const checkout=new Date(product?.BookedCheckout)

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
         
          <div className="flex flex-col gap-2">
            
            <div className="flex items-center gap-2">
              <p className=" text-[#404852]">Rooms</p>
              <p className=" text-[#404852] self-end">:</p>
                <p className="text-primary font-semibold opacity-70">
                {product?.Type+" Rs."+product?.Price+" From  "+(checkin.getdate()+"/"+(checkin.getmonth()+1)+"/"+checkin.getFullYear())+"  to  "+product?.BookedCheckout}
              </p>
              
            
             
            </div>
            
          
          </div>
        </div>

       
        
      </div>

      <Backdrop
        title="Remove Hotel!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to remove the product?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async() => {
              
              await hotelService.deleteProduct(product._id);
              // setCheck(!check);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default AllProductsItems;
