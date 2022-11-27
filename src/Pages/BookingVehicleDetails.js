import React, { useEffect, useState } from "react";
import Input from "../Components/UI/Input";
import { useFormik } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../Components/UI/Card";
import Backdrop from "../Components/UI/BackdropModal";
import ReactToPrint from 'react-to-print';
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import useFetchDoc from "../hooks/useFetchDoc";
import InputFile from "../Components/UI/InputFile";
import TextArea from "../Components/UI/TextArea";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
//import AllTBookings from "./Alltransportbookings"
import { Button, IconButton, InputAdornment } from "@mui/material";
import DatePicker from "react-datepicker";
import hotelService from "../api/transportService.api"
import hotelBookingService from "../api/transportBooking.api"
import { useDispatch, useSelector } from "react-redux";
import { async } from "@firebase/util";

const EditProduct = () => {
  const navigate = useNavigate();
  const  {productId}  = useParams();
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  const {state}=useLocation()
  const [total,setTotal]=useState(state.Vehicle?.Price)
  const [startdate,setstartdate]=useState()
  const [enddate,setenddate]=useState()
  
  const { docData: orders} = useFetchDoc(
    `/get-productCarts`
  );
  const [productCart,setProductCart]=useState(orders)
  const { docData: hotel } = useFetchDoc(
    `/get-transport/${state.Product?.Product?._id}`
  );
  const { docData: hotelbooking } = useFetchDoc(
    `/get-transportbookings`
  );

  let componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const  user  = localStorage.getItem("user");

 const Book=async()=>{
    var a=((new Date(enddate))-(new Date(startdate)));
    var count;
    if(a==0){
      count=a+1
    }
    else{
      count=parseInt(a/(1000 * 3600 * 24))+1
    }
    var date=parseInt(state.Vehicle?.Price*count)
    setTotal(parseInt(state.Vehicle?.Price*count))
    
    var avail=(hotel?.Vehicle.find((item)=>item.id==state?.Vehicle.id))
    console.log("avaial",avail)
    if(avail.availability==undefined){
      avail.availability=[]
    }
    avail.availability.push({Startdate:startdate,Enddate:enddate})

    var answer=avail
    console.log("answer",avail)

   
    var hotelobj=hotel?.Vehicle.filter((item)=>item.id!=state?.Vehicle.id)
    hotelobj.push(avail)
    const hotell=hotelbooking.find((item)=>item.Transport?._id==state.Product?.Product?._id)
    console.log("availability",hotell)
    var bookedroom=[]
    if(hotell!=undefined){
      bookedroom=hotell.bookedVehicle

    }
    bookedroom.push({Type:state.Vehicle?.Type,Price:state.Vehicle?.Price*count,id:state.Vehicle?.id,BookedCheckin:startdate,BookedCheckout:enddate})
    var totalcost=0;
    bookedroom.map((item)=>{
      totalcost=totalcost+item.Price
    })
    
    var obj={user_id:user,Transport:state.Product?.Product?._id,bookedVehicle:bookedroom,Total:totalcost}
    await hotelBookingService.deleteProductCart(hotell?._id)
    await hotelBookingService.addProductCart(obj)
    await hotelService.updateHotel(state.Product?.Product?._id,{Vehicle:hotelobj})
    console.log("whole obj",obj)
    alert("Vehicle Booked")
    navigate("/dashboard/BookTransport")
    }

  useEffect(() => {
    setProductCart(orders?.products)
  }, [user]);
 
  return (
    <>
      <Card>
        <div
          ref={el => (componentRef = el)}
          className="flex flex-col flex-wrap gap-8 px-8 lg:px-12"
        >
          <h1 className="text-2xl">Booking Details</h1>
          <section className={`flex flex-row flex-wrap gap-32 `}>
            
            <Input
            disabled
              width="full"
              type="text"
              label="Vehicle Type:"
              name="state.Vehicle.Type"
              value={state.Vehicle?.Type}
            />

           
             <Input
            disabled
              width="full"
              type="text"
              label="Vehicle Price:"
              name="state.Vehicle.Price"
              value={state.Vehicle?.Price}
            />
            
            </section>
            <Input
            disabled
              width="full"
              type="text"
              label="Vehicle Total:"
              name="total"
              value={"Rs. "+total}
            />
            
            
           
           <div style={{display:'flex',flexDirection:'row'}}>
           <div style={{marginRight:50}}>
                <label style={{ display: "block" }} for="title">
                  <b>Select CheckIn Date</b>
                </label>
                <input
                  name="time"
                  onChange={(e) => {
                    if((new Date(e.target.value))<(new Date(Date.now()))){
                      alert("Date is before today")
                    }
                    else{
                      const a=hotel?.Vehicle.find((item)=>item.id==state?.Vehicle.id)
                      const b=a.availability?.find((item)=>item.Startdate==e.target.value)
                      const c=a.availability?.find((item)=>item.Enddate==e.target.value)

                      if(b!=null || c!=null){
                        alert("Already Booked")
                      }
                      else{
                        setstartdate(e.target.value)
                      }
                    }}}
                  style={{ width: "100%" }}
                  type="date"
                  value={startdate}
                ></input>
           </div>
           <div >
                <label style={{ display: "block" }} for="title">
                  <b>Select CheckOut Date</b>
                </label>
                <input
                  name="time"
                  onChange={(e) => {
                    if((new Date(e.target.value))<(new Date(Date.now()))){
                      alert("Date is before today")
                    }
                    else{
                      if((new Date(e.target.value))<(new Date(startdate))){
                        alert("Date is before Checkin Date")
                      }
                      else{
                        const a=hotel?.Vehicle.find((item)=>item.id==state?.Vehicle.id)
                        const b=a.availability?.find((item)=>item.Startdate==e.target.value)
                        const c=a.availability?.find((item)=>item.Enddate==e.target.value)
  
                        if(b!=null || c!=null){
                          alert("Already Booked")
                        }
                        else{
                          setenddate(e.target.value)
                        }
                      }
                      }}}
                  style={{ width: "100%" }}
                  type="date"
                  value={enddate}
                ></input>
           </div>
           </div>
         
        </div>
        
          <div style={{marginTop:45,justifyContent:'center',placeContent:'center'}}>
            <Button onClick={Book} style={{ marginBottom: "10px",justifySelf:'center',height:"35%", width: 60, marginLeft: '90%', marginTop: 40,fontWeight:'bold',color:'white',backgroundColor:'darkblue' }} >
            Book
          </Button>
          </div>
         
      </Card>
    </>
  );
};

export default EditProduct;
