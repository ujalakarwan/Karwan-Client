import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
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
  const [group,setgroups]=useState()
  const [wishlist,setwishlist]=useState()
  const [Cheques,setcheques]=useState([])
  const [Advance,setAdvances]=useState([])
  const [advance,setadvance]=useState({Type:"Advance",Number:"",Date:"",id:0,Description:"",Amount:0})
  const [cheque,setcheque]=useState({Type:"Cheque",Number:"",Date:"",id:0,Description:"",Amount:0})
  const { docData: user } = useFetchDoc(
    `/get-user/${productId}`
  );
  const { docData: orders} = useFetchDoc(
    `/get-productCarts`
  );
  const [productCart,setProductCart]=useState(orders)
  const { docData: hotelbooking } = useFetchDoc(
    `/get-hotelbookings`
  );

  const { docData: transportbooking } = useFetchDoc(
    `/get-transportbookings`
  );
  const { docData: visas } = useFetchDoc(
    `/get-visa`
  );
  const { docData: groups} = useFetchDoc(
    `/get-groups`
  );
  const { docData: wishlists} = useFetchDoc(
    `/get-wishlist`
  );

  useEffect(() => {
    const a=visas?.find((item)=>item?.user_id==productId)
    if(a){
      setvisa(a.visaStatus)
    }
    var array=[]
    groups?.map((item)=>{
      if(item.groupMembers?.find((item)=>item?._id==productId)){
        array.push(item.groupName)
      }
    })
    setgroups(array)
    
    const b=wishlists?.find((item)=>item?.user_id?._id==productId)
    if(b){
      setwishlist(b.product_id.length)
    }

    setcheques(user?.AdditionalCharges.filter((item)=>item.Type=="Cheque"))
    setAdvances(user?.AdditionalCharges.filter((item)=>item.Type=="Advance"))

  },[wishlists]);
  let componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [Users,setUsers]=useState(user?.family)
  useEffect(() => {
    setUser(user?.family)
  }, [user]);
 
  useEffect(() => {
    setProductCart(orders?.products)
  }, [user]);
 
  return (
    <>
      <Card>
        <form
          ref={el => (componentRef = el)}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
           <div style={{display:'flex',flexDirection:'row'}}>

          {user?.profilePic ? (
              <div style={{marginRight:5}}>
              <img
                src={user?.profilePic}
                alt=""
                className="object-cover h-16 w-16 rounded-full"
              />
              </div>
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
              <h1 style={{marginTop:12,marginLeft:20,fontSize:24}}>Account Details</h1>

            </div>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            <div style={{display:'flex',flexDirection:'row'}}>
            
            <Input
              
              disabled
              width="full"
              type="text"
              label="Name:"
              name="user.userName"
              value={user?.userName}
            />
            <div style={{marginLeft:10,marginRight:10}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Email:"
              name="user.email"
              value={user?.email}
            />
            </div>
            <div style={{marginRight:10}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Contact:"
              name="user.contact"
              value={user?.contact}
            />
            </div>
            <div style={{marginRight:10,width:"50%"}}>

            <Input
            disabled
              width="full"
              type="text"
              label="Address:"
              name="user.address"
              value={user?.address}
            />
            </div>

            </div>
            
            
          
      <label className="text-secondary font-semibold">Family:</label>
      
            {user?.family?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center',justifyContent:'space-between',width:"100%"}}>
              <div style={{display:'flex',flexDirection:'row'}}>
              <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Name: </label>
            <p style={{marginRight:20}}>{item.name}</p>
            
              </div>
              <div style={{display:'flex',flexDirection:'row'}}>
            
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Contact: </label>
            <p style={{marginRight:20}}>{item.contact}</p>
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>

            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Relation: </label>
            <p style={{marginRight:20}}>{item.relation}</p>
            </div>
            <div style={{marginRight:5}}></div>
            
            </div>
            ))}
           
           <div style={{display:'flex',flexDirection:'row'}}>
            
            <Input
              
              disabled
              width="full"
              type="text"
              label="Visa Status:"
              name="visa"
              value={visa}
            />
            <div style={{marginLeft:10,marginRight:10}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Wishlist Items:"
              name="wishlist"
              value={wishlist}
            />
            </div>
            <div style={{marginRight:10}}>
            
            </div>
            <div style={{marginRight:10,width:"50%"}}>
            <Input
            disabled
              width="full"
              type="text"
              label="Group Names:"
              name="group"
              value={group}
            />
            </div>

            </div>
            
           <label className="text-secondary font-semibold">Orders:</label>
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
                  ))}
           <label className="text-secondary font-semibold">Hotel Bookings:</label>
           {hotelbooking &&
                  hotelbooking?.map((products) =>(
                    products?.user_id?._id==productId?
                    (
                            <AllBookings
                            key={products._id}
                            product={products}
                            productCart={products}
                          />
                           )
                    :<></>
                  ))}
           <label className="text-secondary font-semibold">Transport Bookings:</label>
           {transportbooking &&
                  transportbooking?.map((products) =>(
                    products?.user_id?._id==productId?
                    (
                      <AllTBookings
                      key={products._id}
                      product={products}
                      productCart={products}
                    />
                     )
                    :<></>
                  ))}

<label style={{marginTop:10,fontWeight:'bold',fontSize:20}}>Additional Payment Status:</label>
<label style={{marginTop:10,fontWeight:'bold'}}>Advance Payments:</label>

<div style={{display:'flex',flexDirection:'row',margin:5}} className="print:invisible">
<label style={{marginTop:10}} >Id:</label>
            <input
              style={{width:"23%",marginLeft:20,marginRight:20}}
              type="number"
              label="Id:"
              name="advance.id"
              onChange={(e) => {
                var value={id:e.target.value}
                 setadvance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={advance.id}
            />
        <label style={{margin:10}}>Type:</label>
                      
              <select
                type="text"
                name="advance.Type"
                style={{width:"13%",marginRight:10}}
                onChange={(e) => {
                  var value={Type:e.target.value}
                   setadvance(shopCart => ({
                  ...shopCart,
                  ...value
                }))}}
                value={advance.Type}
              >
                <option value={"Advance"}>Advance</option>
                
              </select>
            
            <label style={{marginLeft:10,marginTop:10,width:"12%"}} >Account No:</label>
            <input
              style={{width:"23%",marginLeft:20,marginRight:20}}
              type="text"
              label="Account No:"
              name="advance.Number"
              onChange={(e) => {
                var value={Number:e.target.value}
                 setadvance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={advance.Number}
            />
           
           
            <label style={{marginLeft:12,marginTop:10}} >Amount:</label>
            <input
              style={{width:"23%",marginLeft:20,marginRight:20}}
              type="number"
              label="Amount:"
              name="advance.Amount"
              onChange={(e) => {
                var value={Amount:e.target.value}
                 setadvance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={advance.Amount}
            />
                </div>

            <div style={{display:'flex'}} className="print:invisible">
            <label style={{marginTop:10}} >Description:</label>
            <input
              style={{width:"50%",marginLeft:20,marginRight:20}}
              type="text"
              label="Description:"
              name="advance.Description"
              onChange={(e) => {
                var value={Description:e.target.value}
                 setadvance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={advance.Description}
            />
               <div style={{marginRight:50,marginLeft:20}}>
                
                <label style={{ display: "block" }} for="title">
                  <b>Select Date</b>
                </label>
                <input
                  name="advance.Date"
                  onChange={(e) => {
                    var value={Date:e.target.value}
                     setadvance(shopCart => ({
                    ...shopCart,
                    ...value
                  }))}}
                  style={{ width: "100%" }}
                  type="date"
                  value={advance.Date}
                ></input>
           </div>
           <Button 
           style={{fontWeight:'bold',color:'white',backgroundColor:'darkblue',margin:10 }}
        onClick={() => {
          if(Advance.length>0){
            setAdvances([...Advance,advance]);
          }
          else{setAdvances([advance])}

          setadvance({Type:"Advance",Number:"",Date:"",id:advance.id+1,Description:"",Amount:0})
        }}
      >
        Add Payment
      </Button>

           </div>
           {Advance?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center',marginRight:15}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Id: </label>
            <p style={{marginRight:20}}>{item.id}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Account No: </label>
            <p style={{marginRight:20}}>{item.Number}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Amount: </label>
            <p style={{marginRight:20}}>{item.Amount}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Date: </label>
            <p style={{marginRight:20}}>{item.Date}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Description: </label>
            <p style={{marginRight:20}}>{item.Description}</p>
            <Button className="print:invisible"
              type="button" onClick={()=>{
              setadvance(item)
              setAdvances(Advance?.filter((it,index)=>index!=ind))
            }}
            style={{marginRight:10}}
              >
              <div style={{marginBottom:2}}>edit</div>
            </Button>
            <Button className="print:invisible"
              type="button" onClick={()=>
              setAdvances(Advance.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}
     



     <label style={{marginTop:10,fontWeight:'bold'}}>Cheque Payments:</label>

<div style={{display:'flex',flexDirection:'row',margin:5}} className="print:invisible">
<label style={{marginTop:10}} >Id:</label>
            <input
              style={{width:"23%",marginLeft:20,marginRight:20}}
              type="number"
              label="Id:"
              name="cheque.id"
              onChange={(e) => {
                var value={id:e.target.value}
                 setcheque(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={cheque.id}
            />
        <label style={{margin:10}}>Type:</label>
                      
              <select
                type="text"
                name="cheque.Type"
                style={{width:"13%",marginRight:10}}
                onChange={(e) => {
                  var value={Type:e.target.value}
                   setcheque(shopCart => ({
                  ...shopCart,
                  ...value
                }))}}
                value={cheque.Type}
              >
                <option value={"Cheque"}>Cheque</option>
                
              </select>
            
            <label style={{marginLeft:10,marginTop:10,width:"12%"}} >Account No:</label>
            <input
              style={{width:"23%",marginLeft:20,marginRight:20}}
              type="text"
              label="Account No:"
              name="cheque.Number"
              onChange={(e) => {
                var value={Number:e.target.value}
                 setcheque(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={cheque.Number}
            />
           
           
            <label style={{marginLeft:12,marginTop:10}} >Amount:</label>
            <input
              style={{width:"23%",marginLeft:20,marginRight:20}}
              type="number"
              label="Amount:"
              name="cheque.Amount"
              onChange={(e) => {
                var value={Amount:e.target.value}
                 setcheque(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={cheque.Amount}
            />
                </div>

            <div style={{display:'flex'}} className="print:invisible">
            <label style={{marginTop:10}} className="print:invisible">Description:</label>
            <input className="print:invisible"
              style={{width:"50%",marginLeft:20,marginRight:20}}
              type="text"
              label="Description:"
              name="cheque.Description"
              onChange={(e) => {
                var value={Description:e.target.value}
                 setcheque(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={cheque.Description}
            />
               <div style={{marginRight:50,marginLeft:20}} className="print:invisible">
                
                <label style={{ display: "block" }} for="title" className="print:invisible">
                  <b>Select Date</b>
                </label>
                <input
                className="print:invisible"
                  name="cheque.Date"
                  onChange={(e) => {
                    var value={Date:e.target.value}
                     setcheque(shopCart => ({
                    ...shopCart,
                    ...value
                  }))}}
                  style={{ width: "100%" }}
                  type="date"
                  value={cheque.Date}
                ></input>
           </div>
           <Button className="print:invisible"
           style={{fontWeight:'bold',color:'white',backgroundColor:'darkblue',margin:10 }}
        onClick={() => {
          if(Cheques.length>0){
            setcheques([...Cheques,cheque]);
          }
          else{setcheques([cheque])}

          setcheque({Type:"Cheque",Number:"",Date:"",id:cheque.id+1,Description:"",Amount:0})
        }}
      >
        Add Payment
      </Button>

           </div>
           {Cheques?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center' ,marginRight:15}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Id: </label>
            <p style={{marginRight:20}}>{item.id}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Account No: </label>
            <p style={{marginRight:20}}>{item.Number}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Amount: </label>
            <p style={{marginRight:20}}>{item.Amount}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Date: </label>
            <p style={{marginRight:20}}>{item.Date}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Description: </label>
            <p style={{marginRight:20}}>{item.Description}</p>
            <Button className="print:invisible"
              type="button" onClick={()=>{
              setcheque(item)
              setcheques(Cheques?.filter((it,index)=>index!=ind))
            }}
            style={{marginRight:10}}
              >
              <div style={{marginBottom:2}}>edit</div>
            </Button>
            <Button className="print:invisible"
              type="button" onClick={()=>
              setcheques(Cheques.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}

            <Button className="print:invisible"
            style={{marginRight:"40%",color:'white',backgroundColor:'darkgreen',marginLeft:'40%'}}
              type="button"
              onClick={async() => {
                  const a=Advance.concat(Cheques)
                  console.log("aaa",a)
                  await userService.updateUser(productId,{AdditionalCharges:a});
                  alert("Status Updated")
      
                
              }}
            >
              Save Payment Status
            </Button>

          

          </section>
        </form>
        <div style={{display:'flex',alignSelf:'center',justifyContent:'space-between',width:"50%"}}>
        <ReactToPrint
          trigger={() =>
          <div style={{marginTop:45,justifyContent:'center',placeContent:'center'}}>
            <Button style={{ marginBottom: "10px",padding:20,justifySelf:'center',height:"35%", width: 80, marginTop: 40,fontWeight:'bold',color:'white',backgroundColor:'darkblue' }} >
            Print
          </Button>
          </div>}
          content={() => componentRef}
        />

        <ReactToPrint
          trigger={() =>
          <div style={{marginTop:45,justifyContent:'center',placeContent:'center'}}>
            <Button style={{ marginBottom: "10px",padding:20,justifySelf:'center',height:"35%", width: "100%", marginTop: 40,fontWeight:'bold',color:'white',backgroundColor:'darkblue' }} >
            Save PDF
          </Button>
          </div>}
          content={() => componentRef}
        />
<div style={{marginTop:45,justifyContent:'center',placeContent:'center'}}>
            <Button style={{ marginBottom: "10px",padding:20,justifySelf:'center',height:"35%", width: "100%", marginTop: 40,fontWeight:'bold',color:'white',backgroundColor:'darkblue' }} >
            Email Report
          </Button>
          </div>
          </div>

      </Card>
    </>
  );
};

export default EditProduct;
