import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../api/users.api";

import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const AllUsersItems = ({ user, check, setCheck }) => {
  // console.log(user);
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span lg:col-span-8 flex place-self-start text-left font-semibold text-primary">
          <div className="grid place-items-center mr-4">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt=""
                className="object-cover h-14 w-14 rounded-full"
              />
            ) : (
              <div className="h-14 w-14 bg-slate-300 rounded-full" />
            )}
          </div>
          <div>
              <p >{user?.userName+" : "+user?._id}</p>

              <div className="flex" >
             
              <p className="text-sm font-normal opacity-70">
                Number:
              </p>
                <p className="text-sm font-normal opacity-70">
                {user?.contact}
              </p>
              
            </div>
            </div>


        </div>
        <div className="col-span lg:col-span">
          <Button
            onClick={() => {
              navigate(`/dashboard/show-transanction/${user._id}`,{state:{user:user}});
            }}
          >
            Transaction History
          </Button>
        </div>
        
      </div>
      <Backdrop
        title="Delete User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the user?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await userService.deleteUser(user._id);
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

export default AllUsersItems;
