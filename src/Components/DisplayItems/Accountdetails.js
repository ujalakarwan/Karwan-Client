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

const EditProduct = () => {
  const navigate = useNavigate();
  const  {productId}  = useParams();
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  console.log("da",productId)
  const [User,setUser]=useState({name:"",contact:"",relation:""})
  

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

  console.log("usad",transportbooking)
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
          <h1 className="text-2xl">Account Details</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            
            <Input
            disabled
              width="full"
              type="text"
              label="Name:"
              name="user.userName"
              value={user?.userName}
            />
            
          
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
                    products?.user_id._id==productId?
                    (
                            <AllBookings
                            key={products._id}
                            product={products}
                            productCart={products}
                          />
                           )
                    :<div></div>
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
                    :<div></div>
                  ))}
          </section>
          
          


          
         
        </form>
        <ReactToPrint
          trigger={() =>
          <div style={{marginTop:45,justifyContent:'center',placeContent:'center'}}>
            <Button style={{ marginBottom: "10px",justifySelf:'center',height:"35%", width: 60, marginLeft: '90%', marginTop: 40,fontWeight:'bold',color:'white',backgroundColor:'darkblue' }} >
            Print
          </Button>
          </div>}
          content={() => componentRef}
        />
      </Card>
    </>
  );
};

export default EditProduct;
