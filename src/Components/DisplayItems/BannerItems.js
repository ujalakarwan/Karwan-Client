import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerService from "../../api/banners.api";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const BannerItems = ({ banner, check, setCheck }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {banner?.bannerImage ? (
              <img
                src={banner?.bannerImage}
                alt=""
                className="object-cover h-20 w-24 rounded"
              />
            ) : (
              <div className="h-20 w-24 bg-slate-300 rounded" />
            )}
          </div>
          <p className="flex items-center">{banner?.title}</p>
        </div>
        {/* <div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-banner/${banner._id}`);
            }}
          >
            Edit
          </Button>
        </div> */}
        <div className="col-span-5 lg:col-span-3">
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
        Are you sure you want to delete the banner?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await bannerService.deleteBanner(banner._id);
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

export default BannerItems;
