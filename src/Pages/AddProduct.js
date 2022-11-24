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

const AddProduct = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [productPic, setProductPic] = useState(null);
  const [fileBase64String, setFileBase64String] = useState("");

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
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
      productImage: fileBase64String,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (
        values.title &&
        values.price &&
        values.description &&
        values.rating &&
        values.productImage &&
        values.productImage
      ) {
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
          <h1 className="text-2xl">Edit User</h1>
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
               <label
        className="block  py-1 px-2 cursor-pointer rounded text-center min-w-[8rem] max-w-[10rem]
        border-2 border-dashed border-primary 
        hover:border-3 hover:border-dashed hover:border-primary 
        transition ease-out duration-1000"
      >
        <span className="text-sm">
          {productPic?.name ? productPic?.name : "Choose image"}
        </span>
        <input className="hidden" type="file" name={productPic?.name}  onChange={(e) => {
                  setProductPic(e.target.files[0])
                  encodeFileBase64(productPic)
                }} />
      </label>

    
        <Button
          type="button"
          //onClick={() => {
          //  encodeFileBase64(productPic);
          //}}
        >
          Upload
        </Button>
    
             
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
                setShowModal(true);
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
