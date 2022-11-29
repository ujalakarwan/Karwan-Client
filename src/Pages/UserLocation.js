import React, { useState } from "react";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../Components/UI/Card";
import hotelService from "../api/hotelService.api";
import InputFile from "../Components/UI/InputFilemul";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMapReact from 'google-map-react';
import { async } from "@firebase/util";
import { FaMapMarkerAlt } from "react-icons/fa"
const AnyReactComponent = ({ text }) =><FaMapMarkerAlt/>;
const AddProduct = () => {
  const navigate = useNavigate();
  const {state}=useLocation()
  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState(null);
  const [Rooms,setRooms]=useState([])
  const [distances,setdistances]=useState([])
  const [room,setroom]=useState({Type:"",Size:"",id:0,Price:0,availability:[]})
  const [distance,setdistance]=useState({place:"",distance:""})
  const [fileBase64String, setFileBase64String] = useState("");
  console.log("lat", state?.location?.lon)
  const defaultProps = {
    center: {
      lat: state?.location?.lat,
      lng:state?.location?.lon
    },
    zoom: 16
  };
 

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      
      {
          state?.location?.lat?
    
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyBSp32hxkn2p8D6bF_HrkgsJKvq_x6tjV0" }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
    >
      <AnyReactComponent
        lat= {state?.location?.lat}
        lng= {state?.location?.lon}
        text="My Marker"
      />
    </GoogleMapReact>
    :
    <div style={{marginTop:40,backgroundColor:'white',padding:40,borderRadius:15}}>

    <div style={{marginLeft:"45%"}}>
      <p style={{fontWeight:'bold',fontSize:20}}>No Location</p></div>
      </div>

    }
  </div>

  );
};

export default AddProduct;
