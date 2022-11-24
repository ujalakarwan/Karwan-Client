import React, { useState } from "react";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../UI/Card";
import Button from "../UI/Button";
import Backdrop from "../UI/BackdropModal";

import useFetchDoc from "../../hooks/useFetchDoc";
import InputFile from "../UI/InputFile";
import TextArea from "../UI/TextArea";
import productService from "../../api/productService";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const { docData: product, isloading } = useFetchDoc(
    `/get-product/${productId}`
  );

  console.log(product);
  const [fileBase64String, setFileBase64String] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
      title: product?.title,
      price: product?.price,
      description: product?.description,
      rating: product?.rating,
      productImage: product?.productImage,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      values.productImage=fileBase64String
      await productService.updateProduct(productId, values);
      navigate("/dashboard/products");
    },
  });

  return (
    <>
      <Card>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col flex-wrap gap-6 px-6 lg:px-14"
        >
          <h1 className="text-2xl">Edit Product</h1>
          <section
            className={`flex flex-col flex-wrap gap-6 transition-opacity duration-500 ease-out
          ${isloading ? "opacity-50" : "opacity-100"}`}
          >
            <div className="flex items-center gap-6 mr-4">
              {product?.productImage || formik.values.profilePic ? (
                <img
                  src={product?.productImage || formik.values.profilePic}
                  alt=""
                  className="object-cover h-14 w-14 rounded-full"
                />
              ) : (
                <div className="h-14 w-14 bg-slate-300 rounded-full" />
              )}
              <InputFile
                name="imagePath"
                imageName={profilePic?.name}
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                }}
                onUpload={() => {
                  encodeFileBase64(profilePic);
                }}
              >
                Upload
              </InputFile>
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
              <div className="text-base p-1">Update</div>
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate("/dashboard/products");
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
            Are you sure you want to update product details?
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
