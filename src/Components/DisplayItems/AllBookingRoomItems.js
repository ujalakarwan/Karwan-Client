import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Select from "../UI/Select";
import hotelService from '../../api/hotelService.api'
const AllProductsItems = ({ product,products, productCart, setProductCart }) => {
  let navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  console.log(product && product);
  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          
          <div className="flex flex-col gap-2">
            <p>{product?.Type +" -   "+product?.Size}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852]">Price</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary font-semibold opacity-70">
                {product?.Price}
              </p>
            </div>
         
          </div>
        </div>

        <div className="col-span-2 lg:col-span">
          <Button
            onClick={() => {
              navigate(`/dashboard/Confirm-Room/${product?._id}`,{state:{Product:products,Room:product}});
            }}>
            Book
          </Button>
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
