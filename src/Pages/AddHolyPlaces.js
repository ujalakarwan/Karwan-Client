import React, { useState,useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Card from "../Components/UI/Card";
import hotelService from "../api/holyplaces.api";
import InputFile from "../Components/UI/InputFilemul";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMapReact from 'google-map-react';
import { async } from "@firebase/util";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { FaMapMarkerAlt } from "react-icons/fa"
import useFetchDoc from "../hooks/useFetchDoc";
import { style } from "@mui/system";

const AnyReactComponent = ({ text }) =><FaMapMarkerAlt/>;
const AddProduct = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
 
  const [distances,setdistances]=useState([])
  const [distance,setdistance]=useState({id:0,Name:"",lat:0.0,lon:0.0})
  const { docData: holyplaces, isloading } = useFetchDoc(
    `/get-holyplaces`
  );
  useEffect(() => {
    setdistances(holyplaces[0]?.distances)
  }, [holyplaces]);
  const centers = [{
    kaaba:{
    lat: 33.6844,
    lng: 73.0479
    }},
    {
    Abubakar:{
    lat: 33.6844,
    lng: 73.0479
    }},
    {
    jamarat:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Jannatulmala:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Masjidayesha:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {MasjidJin:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Muzdalifah:{
      lat: 33.6844,
      lng: 73.0479
    }},
    {Mina:{
      lat: 33.6844,
      lng: 73.0479
    }},
  ];
  

  
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  const formik = useFormik({
    initialValues: {
      
      distances:[]
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (
        values.distances
        ) {
          values.distances=distances
          console.log("sdaca",values)
          if(!holyplaces){
            await hotelService.addProductCart(values);
          }
          else{
            await hotelService.updateProductCart(holyplaces[0]?._id,values);

          }
       // navigate("/dashboard/Stats");
       // setdistances([])
      }
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Add HolyPlaces Distances</h1>
          
          

            <div style={{display:'flex',flexDirection:'row'}}>
            <label className="text-secondary">Id:</label>
            <input
              type="text"
              label="Id:"
              name="distance.id"
              onChange={(e) => {
                var value={id:e.target.value}
                 setdistance(shopCart => ({
                ...shopCart,
                ...value
              }))
            }}value={distance.id}
            style={{width:"10%",marginLeft:20,marginRight:20}}
          />
                      <label className="text-secondary">Name:</label>

            <input
              type="text"
              label="Place:"
              name="distance.Name"
              onChange={(e) => {
                var value={Name:e.target.value}
                 setdistance(shopCart => ({
                ...shopCart,
                ...value
              }))
            }}
              value={distance.Name}
              style={{width:"10%",marginLeft:20,marginRight:20}}
            />
            <label className="text-secondary">Latitude:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="number"
              label="Distance:"
              name="distance.lat"
              onChange={(e) => {
                var value={lat:e.target.value}
                setdistance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={distance.lat}
            />
            
            <label className="text-secondary">longitude:</label>
            <input
              style={{width:"25%",marginLeft:20,marginRight:20}}
              type="number"
              label="Distance:"
              name="distance.lon"
              onChange={(e) => {
                var value={lon:e.target.value}
                setdistance(shopCart => ({
                ...shopCart,
                ...value
              }))}}
              value={distance.lon}
            />
          
            <Button
              type="button" onClick={()=>{
                if(distances.length>0){
                  setdistances([...distances,distance]);
                }
                else{setdistances([distance])}
                setdistance({id:0,Name:"",lat:0.0,lon:0.0})
              }}>
              <div className="text-base p-1">Add</div>
            </Button>
            </div>
            
            {distances?.map((item,ind)=>(
            <div style={{display:'flex',flexDirection:'row',borderWidth:2,borderColor:'black',borderRadius:2,padding:7,alignSelf:'center'}}>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Place: </label>
            <p style={{marginRight:20}}>{item.Name}</p>
            <label className="text-secondary" style={{marginRight:10,fontWeight:'bold'}}>Location: </label>
            <p style={{marginRight:20}}>{item.lat+" , "+item.lon}</p>
            <Button
              type="button" onClick={()=>{
              setdistance(item)
              setdistances(distances?.filter((it,index)=>index!=ind))
            }}
            style={{marginRight:10}}

              >
              <div style={{marginBottom:2}}>edit</div>
            </Button>
            <Button
              type="button" onClick={()=>
              setdistances(distances.filter((it,index)=>index!=ind))}>
              <div style={{marginBottom:2}}>delete</div>
            </Button>
            </div>
            ))}

            
            
          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add HolyPlaces</div>
            </Button>
          </div>
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add the HolyPlaces?
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

export default AddProduct;
