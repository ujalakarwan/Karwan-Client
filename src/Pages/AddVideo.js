import { useFormik } from "formik";
import React, { useState } from "react";
import Card from "../Components/UI/Card";
import Input from "../Components/UI/Input";
import TextArea from "../Components/UI/TextArea";
import Backdrop from "../Components/UI/BackdropModal";
import Button from "../Components/UI/Button";
import { useNavigate } from "react-router-dom";
import videoService from "../api/videos.api";

const AddVideo = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      videoLink: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      await videoService.addVideo(values);
      navigate("/dashboard");
    },
  });
  return (
    <>
      <Card>
        <div className="w-[90%] max-w-5xl h-full mx-auto">
          <h1 className="text-4xl">Add Video</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col flex-wrap gap-4 pt-6 md:px-14 md:gap-6"
          >
            <Input
              width="full"
              type="text"
              name="videoLink"
              label="Video Link"
              onChange={formik.handleChange}
              value={formik.values.videoLink}
            />
            {/* <TextArea
              type="text"
              rows={5}
              placeholder="Description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.requirment}
            />
            <input type="file" name="" id="" /> */}
            <div>
              <Button
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <div className="text-base p-1">Add Video</div>
              </Button>
            </div>
            <Backdrop
              title="Add Video"
              show={showModal}
              onClick={() => setShowModal(false)}
            >
              Do you want to add this Video ?
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

export default AddVideo;
