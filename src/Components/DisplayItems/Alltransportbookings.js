import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Select from "../UI/Select";

const AllProductsItems = ({ product, productCart, setProductCart }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  console.log(product && product);
  return (
    <div className="border" >
    
                              { product?.bookedVehicle?.map((products) =>(

      <div className="grid grid-cols-12 place-items-center text-center border ">
        <div className="col-span-8 lg:col-span-8 flex place-self-start text-left font-semibold text-primary">
          
          <div className="flex flex-col gap-2">
            <p>{products?.Type}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852]">Price</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary font-semibold opacity-70">
                {products?.Price}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span lg:col-span">
          <p className=" text-secondary font-semibold">
          {(products?.BookedCheckin)}
          </p>
        </div>
        <div>-</div>
        <div className="col-span lg:col-span-1" >
          <p className=" text-secondary font-semibold">{products?.BookedCheckout}</p>
        </div>
      </div>
                              ))}
      <div className="flex flex-col gap-2">
            
            <div className="flex text-center gap-2">
              <p className=" text-[#404852] font-bold ">Total</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary font-bold opacity-70">
                {product?.Total}
              </p>
            </div>
          </div>

      <Backdrop
        title="Remove User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to remove the product?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={() => {
              let newGroup = productCart?.filter(
                (member) => !(product._id === member._id)
              );
              setProductCart(newGroup);
              console.log(newGroup);
              // await userService.deleteUser(product._id);
              // setCheck(!check);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </div>
  );
};

export default AllProductsItems;
