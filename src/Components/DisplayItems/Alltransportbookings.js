import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";
import Select from "../UI/Select";
import transportBooking from '../../api/transportBooking.api'
const AllProductsItems = ({ product, productCart, setProductCart }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  console.log(product && product);
  const [Type,settype]=useState()
  const [AccountNo,setAccount]=useState()
  const [flag,setflag]=useState(false)
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
                                {console.log("pdds",products)}
        <div className="col-span lg:col-span">
          <p className=" text-secondary font-semibold">
          {(((new Date(products?.BookedCheckin)).getDate()+"/"+((new Date(products?.BookedCheckin)).getMonth()+1)+"/"+(new Date(products?.BookedCheckin)).getFullYear()).toString())}
          </p>
        </div>
        <div>-</div>
        <div className="col-span lg:col-span-1" >
          <p className=" text-secondary font-semibold">
          {((new Date(products?.BookedCheckout)).getDate()+"/"+((new Date(products?.BookedCheckout)).getMonth()+1)+"/"+(new Date(products?.BookedCheckout)).getFullYear()).toString()}
            </p>
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
{flag?
  <div className="flex flex-col gap-2">
            
            <div className="flex text-center gap-2">
              <p className=" text-[#404852] font-bold ">{Type}</p>
              <p className=" text-[#404852] self-end">:</p>
              <p className="text-primary font-bold opacity-70">
                {AccountNo}
              </p>
            </div>
          </div>

:
          <div style={{display:'flex',flexDirection:'row',margin:5,height:"26%",justifyContent:"center"}} className="print:invisible">
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

          await transportBooking.updateProductCart(product._id, {
            paymentstatus: {Type:Type,AccountNo:AccountNo},
          });
          setflag(true)
         // navigate("/dashboard/Accounts");
        }}
      >
        Add Payment
      </Button>
    </div>
}
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
