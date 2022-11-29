import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Backdrop from "../UI/BackdropModal";
import ReactToPrint from 'react-to-print';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useFetchDoc from "../../hooks/useFetchDoc";
import InputFile from "../UI/InputFile";
import TextArea from "../UI/TextArea";
import hotelService from "../../api/users.api";
import AllProductsItems from "./AllProductsShow";
import AllBookings from "./Allhotelbookings"
import AllTBookings from "./Alltransportbookings"
import { Button, IconButton, InputAdornment } from "@mui/material";
import userService from "../../api/users.api"
const EditProduct = () => {
  const navigate = useNavigate();
  const  {productId}  = useParams();
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  const [User,setUser]=useState({name:"",contact:"",relation:""})
  const [visa,setvisa]=useState()
  const [book,setbook]=useState()
  const {state}=useLocation()
  const [group,setgroups]=useState()
  const [wishlist,setwishlist]=useState()
  const [Cheques,setcheques]=useState([])
  const [Advance,setAdvances]=useState([])
  const [advance,setadvance]=useState({Type:"Advance",Number:"",Date:"",id:0,Description:"",Amount:0})
  const [cheque,setcheque]=useState({Type:"Cheque",Number:"",Date:"",id:0,Description:"",Amount:0})
  const [transactions,settransanctions]=useState([])
  const [order,setorder]=useState()
  

  const { docData: Transactions} = useFetchDoc(
    `/get-transanctions`
  );
  const { docData: hotelbooking } = useFetchDoc(
    `/get-hotelbookings`
  );

  const { docData: transportbooking } = useFetchDoc(
    `/get-transportbookings`
  );
  const { docData: orders } = useFetchDoc(
    `/get-productCarts`
  );
  

  useEffect(() => {
    console.log("transactions",state)
    var a =Transactions?.filter((item)=>item?.user_id?._id==state.user?._id)
   settransanctions(Transactions?.filter((item)=>item?.user_id?._id==state.user?._id))
   console.log("transactions",a)
   var array=[]
   a?.map((item,ind)=>{
      if(item.order_type=="order"){
        item.order_id=orders?.find((it)=>it._id==item.order_id)
      }else if(item.order_type=="hotel"){
        item.order_id=hotelbooking?.find((it)=>it._id==item.order_id)
      }else if(item.order_type=="transport"){
        item.order_id=transportbooking?.find((it)=>it._id==item.order_id)
      }
   })
   console.log("aaaa",a)
   settransanctions(a)
  },[orders]);
  return (
    <>
      <Card>
        <form
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
           <div style={{display:'flex',flexDirection:'row'}}>

          {state.user?.profilePic ? (
              <div style={{marginRight:5}}>
              <img
                src={state.user?.profilePic}
                alt=""
                className="object-cover h-16 w-16 rounded-full"
              />
              </div>
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
              <h1 style={{marginTop:12,marginLeft:20,fontSize:24}}>Transaction Details</h1>

            </div>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            <div style={{display:'flex',flexDirection:'row'}}>
            
            <Input
              
              disabled
              width="full"
              type="text"
              label="Name:"
              name="state.user.userName"
              value={state.user?.userName}
            />
            <div style={{marginLeft:10,marginRight:10}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Email:"
              name="state.user.email"
              value={state.user?.email}
            />
            </div>
            <div style={{marginRight:10}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Contact:"
              name="state.user.contact"
              value={state.user?.contact}
            />
            </div>
            <div style={{marginRight:10,width:"50%"}}>

            <Input
            disabled
              width="full"
              type="text"
              label="Address:"
              name="user.address"
              value={state.user?.address}
            />
            </div>

            </div>
            
            
          
      {transactions?.map((item)=>(

          <div style={{display:'flex',flexDirection:'row'}}>
            
            <Input
              
              disabled
              width="full"
              type="text"
              label="Transaction Id:"
              name="item.Transaction_id"
              value={item.Transaction_id}
            />
            <div style={{marginLeft:10,marginRight:10}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Currency:"
              name="item.currency"
              value={item.currency}
            />
            </div>
            
            <div style={{marginRight:10,width:"50%"}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Amount:"
              name="item.Amount"
              value={item.Amount}
            />
            </div>
            <div style={{marginRight:10,width:"50%"}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Status:"
              name="item.TransanctionStatus"
              value={item.TransanctionStatus}
            />
            </div>
            </div>

      ))}
          
            
          {/*} <label className="text-secondary font-semibold">Orders:</label>
           {orders &&
           orders?.map((order)=>(
            order?.user_id?._id==productId?
            
              <AllProductsItems
                key={order._id}
                product={order}
                productCart={order}
              />
           :
           <></>
           ))}*/}
          

          </section>
        </form>
        

      </Card>
    </>
  );
};

export default EditProduct;
