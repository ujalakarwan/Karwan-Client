import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../Components/UI/Input";
import Card from "../Components/UI/Card";
import Button from "../Components/UI/Button";
import Backdrop from "../Components/UI/BackdropModal";
import InputFile from "../Components/UI/InputFile";
import userService from "../api/users.api";

const AddUser = () => {
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
      userName: "",
      email: "",
      contact: "",
      address: "",
      profilePic: fileBase64String,
      password: "",
    },
    enableReinitialize: true,

    onSubmit: async (values) => {
      console.log(values);
      if (
        values.userName &&
        values.email &&
        values.contact &&
        values.address &&
        values.password &&
        values.profilePic
      ) {
        await userService.addUser(values);
        navigate("/dashboard/users");
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
          <h1 className="text-2xl">Add User</h1>
          <section className={`flex flex-col flex-wrap gap-6`}>
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
              name="userName"
              label="Name:"
              onChange={formik.handleChange}
              value={formik.values.userName}
            />
            <Input
              width="full"
              type="text"
              label="E-mail:"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Input
              width="full"
              type="text"
              label="Contact:"
              name="contact"
              onChange={formik.handleChange}
              value={formik.values.contact}
            />
            <Input
              width="full"
              type="text"
              label="Address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            <Input
              width="full"
              type="text"
              label="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </section>

          <div className="flex justify-end gap-8 mt-4">
            <Button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <div className="text-base p-1">Add User</div>
            </Button>
          </div>
          <Backdrop
            title="Add"
            show={showModal}
            onClick={() => setShowModal(false)}
          >
            Are you sure you want to add this user?
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

export default AddUser;
