import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";

import useFetchDoc from "../../hooks/useFetchDoc";
import InputFile from "../UI/InputFile";
import TextArea from "../UI/TextArea";
import hotelService from "../../api/transportService.api";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState();
  
  const [room,setroom]=useState({Type:"",Size:"",Price:0,availability:[]})
  const [distance,setdistance]=useState({place:"",distance:""})
  const [fileBase64String, setFileBase64String] = useState("");
  const { docData: product, isloading } = useFetchDoc(
    `/get-transport/${productId}`
  );
  const [Rooms,setRooms]=useState(product?.Vehicle)
  console.log(product);
  console.log(Rooms);
  useEffect(() => {
    setRooms(product?.Vehicle)
  }, [product]);
  const [profilePic, setProfilePic] = useState(null);
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    var array=[]
    var arr=file
    console.log("gfdo",file)
    
      console.log("dbasj")
      if (file) {
         reader.readAsDataURL(file);
       reader.onload =() => {
          var Base64 = reader.result;

          setFileBase64String(Base64);
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
    
    console.log("arrya",fileBase64String)
    
  };
  const formik = useFormik({
    initialValues: {
      Name: product?.Name,
      Facilities: product?.Facilities,
      Vehicle: product?.Vehicle,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      values.Vehicle=Rooms
          console.log("sdaca",values)
      await hotelService.updateHotel(productId, values);
     navigate("/dashboard/transports");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Transport</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
            
            <Input
              width="full"
              type="text"
              label="Name:"
              name="Name"
              onChange={formik.handleChange}
              value={formik.values.Name}
            />
            
          
            <TextArea
            rows={3}
            type="text"
            label="Facilities:"
            name="Facilities"
            onChange={formik.handleChange}
            value={formik.values.Facilities}
          />
          
      <label className="text-secondary font-semibold">Vehicle:</label>
      <div style={{display:'flex',flexDirection:'row'}}>
            <label className="text-secondary">Type:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Type:"
              name="room.Type"
              onChange={(e) => {
                var value={Type:e.target.value}
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={room.Type}
            />
            <label className="text-secondary">Id:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Size:"
              name="room.id"
              onChange={(e) => {
                var value={id:e.target.value}
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={room.id}
            />
            <label className="text-secondary">Price:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="text"
              label="Price:"
              name="room.Price"
              onChange={(e) => {
                var value={Price:e.target.value}
                setroom(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={room.Price}
            />
            <Button
              type="button" onClick={()=>{
                if(Rooms.length>0){
                  setRooms([...Rooms,room]);
                }
                else{setRooms([room])}
                console.log("saa",Rooms)
                setroom({Type:"",id:0,Price:0,availability:[]})
              }}>
              <div className="text-base p-1">Add</div>
            </Button>
            </div>

            {Rooms?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center'}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Id: </label>
            <p style={{marginRight:20}}>{item.id}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Type: </label>
            <p style={{marginRight:20}}>{item.Type}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Price: </label>
            <p style={{marginRight:20}}>{item.Price}</p>
            <Button
              type="button" onClick={()=>{
              setroom(item)
              setRooms(Rooms?.filter((it,index)=>index!=ind))
            }}
              >
              <div style={{marginBottom:2}}>edit</div>
            </Button>
            <div style={{marginRight:5}}></div>
            
            <Button
              type="button" onClick={()=>
              setRooms(Rooms?.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}
           
          </section>
          

            <div className="flex items-center gap-6 mr-4">
            <p className="text-l" style={{fontweight:'bold'}}>Images</p>



         
            <InputFile
                name="imagePath"
                imageName={productPic?.name}
                onChange={(e) => {
                  setProductPic(e.target.files[0]);
                }}
                onUpload={() => {
                  encodeFileBase64(productPic);
                }}
              >
                Upload
              </InputFile>
            </div>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/hotels");
              }}
            >
              <div className="text-base p-1">Cancel</div>
            </Button>
          </div>
          <Backdrop
            title="Update"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to update Transport details?
            <div className="self-end">
              <Button type={"submit"} onClick={() => setShowModal(false)}>
                OK
              </Button>
            </div>
          </Backdrop>
        </form>
      </Card>
    </>
  );
};

export default EditProduct;
