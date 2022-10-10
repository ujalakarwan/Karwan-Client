import { useFormik } from "formik";
import React, { useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";
import InputFile from "../Components/UI/InputFile";
import bannerService from "../api/banners.api";

const AddBanner = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
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
      bannerImage: fileBase64String,
      title: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      if (values.bannerImage && values.title) {
        await bannerService.addBanner(values);
        navigate("/dashboard/banners");
      }
    },
  });
  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <h1 className="text-4xl">Add Banner Image</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
          >
            <div className="flex items-center gap-6 mr-4">
              {fileBase64String ? (
                <img
                  src={fileBase64String}
                  alt=""
                  className="object-cover h-40 w-64 rounded"
                />
              ) : (
                <div className="h-40 w-64 bg-slate-300 rounded" />
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
              name="title"
              label="Banner Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <div>
              <Button
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <div className="text-base p-1">Add Banner</div>
              </Button>
            </div>
            <Backdrop
              title="Add Video"
              show={showModal}
              onClick={() => setShowModal(false)}
            >
              Do you want to add this Banner?
              <div className="self-end">
                <Button
                  type={"submit"}
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Yes
                </Button>
              </div>
            </Backdrop>
          </form>
        </div>
      </Card>
    </>
  );
};

export default AddBanner;
