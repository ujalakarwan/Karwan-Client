import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../api/productService";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const ProductItems = ({ product, check, setCheck }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-8 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {product?.productImage ? (
              <img
                src={product?.productImage}
                alt=""
                className="object-cover h-20 w-20 rounded-full"
              />
            ) : (
              <div className="h-20 w-20 bg-slate-300 rounded-full" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p>{product?.title}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[12px]">Price</p>
              <p className="text-primary text-[12px] font-semibold opacity-70">
                {product?.price}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-product/${product._id}`);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/Reviews/${product._id}`,{state:{name:product.title,ratings:product.rating,reviews:product.reviews}});
            }}
          >
            Reviews
          </Button>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <Backdrop
        title="Delete!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the product?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await productService.deleteProduct(product._id);
              setCheck(!check);
              setShowModal(false);
            }}
          >
            Yes
          </Button>
        </div>
      </Backdrop>
    </>
  );
};

export default ProductItems;
