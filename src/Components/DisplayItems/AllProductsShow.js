import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Select from "../UI/Select";
import Input from "../UI/Input";
import { async } from "@firebase/util";
import productCartService from "../../api/productCart.api";
const AllProductsItems = ({ product, productCart, setProductCart }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  console.log("dads",product && product);
  const [Type,settype]=useState();
  const [AccountNo,setAccount]=useState()
  return (
    <div className="border">
    { product?.products?.map((products) =>(
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {products?.product_id?.productImage ? (
              <img
                src={products?.product_id?.productImage}
                alt=""
                className="object-cover h-20 w-20 rounded-md"
              />
            ) : (
              <div className="h-20 w-20 bg-slate-300 rounded-md" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>{products?.product_id?.title}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852]">Rating</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary font-semibold opacity-70">
                {products?.product_id?.rating}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <p className=" text-secondary font-semibold">
            Rs. {products?.product_id?.price}
          </p>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <p className="text-secondary font-semibold">x {products?.amount}</p>
        </div>
       
      </div>
      
))}
 <div style={{display:'flex',flexDirection:'row',margin:5,height:"27%",justifyContent:"center"}}>
        <label style={{margin:10}}>Type:</label>

              <select
                type="text"
                name="Type"
                style={{width:"10%"}}
                onChange={(e)=>settype(e.target.value)}
                value={Type}
              >
                <option value={"Cheque"}>Cheque</option>
                <option value={"Advance"}>Advance</option>
                
              </select>
            
            <label style={{marginLeft:12,marginTop:10}} >Account No:</label>
            <input
              style={{width:"23%",marginLeft:20,marginRight:20}}
              type="text"
              label="Account No:"
              name="AccountNo"
              onChange={(e) => {
                setAccount(e.target.value)}}
              value={AccountNo}
            />
              
            
      <Button
        onClick={async() => {

          await productCartService.updateProductCart(product._id, {
            paymentstatus: {Type:Type,AccountNo:AccountNo},
          });
          navigate("/dashboard/Accounts");
        }}
      >
        Add Payment
      </Button>
    </div>

      <Backdrop
        title="Remove User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Payment Method
        <div className="self-end mt-4 flex">

            
            
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


















