import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Card from "../Components/UI/Card";
import productService from "../api/productService";
import InputFile from "../Components/UI/InputFile";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import Spinner from "../Components/UI/Spinner";
const AddProduct = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState(null);
  const [fileBase64String, setFileBase64String] = useState("");
  const [flag,setflag]=useState(false)
  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      setflag(true)
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setFileBase64String(Base64);
      };
      reader.onerror = (error) => {
        console.log("error: ", error);
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      rating: 0,
      productImage: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (
        values.title &&
        values.price &&
        values.description &&
        values.rating 
      
      ) {
        values.productImage=fileBase64String
        await productService.addProduct(values);
        navigate("/dashboard/products");
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
          <h1 className="text-2xl">Add Product</h1>
          <section className={`flex flex-col flex-wrap gap-6 `}>
          <div className="flex items-center gap-6 mr-4">
              {fileBase64String ? (
                <img
                  src={fileBase64String}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )}
          
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
              {
                fileBase64String?
                <p>Uploaded</p>:
                flag?
                <div className="z-30 m-auto mt-20">
                <Spinner />
              </div>:
                <p></p>

              }
            </div>
            <Input
              width="full"
              type="text"
              label="Title:"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <Input
              width="full"
              type="number"
              label="Price:"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            <Input
              width="full"
              type="number"
              label="Rating:"
              name="rating"
              onChange={formik.handleChange}
              value={formik.values.rating}
            />
            <TextArea
              rows={4}
              type="text"
              label="Description:"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </section>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                if((formik.values.rating<5 && formik.values.rating>0) && (formik.values.price>0 ) && formik.values.description!="" && formik.values.title!="" && fileBase64String!=""){
                  setShowModal(true);
                }
                else{
                  alert("Enter Data")

                }
              }}
            >
              <div className="text-base p-1">Add Product</div>
            </Button>
          </div>
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add this product?
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
