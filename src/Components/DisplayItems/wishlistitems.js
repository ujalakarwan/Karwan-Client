import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bookRequestService from "../../api/bookRequests.api";
import Backdrop from "../UI/BackdropModal";
import Button from "../UI/Button";

const BooksRequestsItems = ({ bookRequest, check, setCheck }) => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-12 place-items-center text-center">
        <div className="col-span-7 lg:col-span-9 flex place-self-start text-left font-semibold text-primary">
        <div className="col-span-7 lg:col-span-8 flex place-self-start text-left font-semibold text-primary">
          
          <div className="flex flex-col gap-2">
            <p>{bookRequest?.user_id?.userName}</p>
            <div className="flex items-center gap-2">
              <p className=" text-[#404852] text-[12px]">Products:</p>
              {
            bookRequest?.product_id?.map((item)=>(
              <p className="text-primary text-[12px] font-semibold opacity-70">{item?.title}</p>

            ))
          }
            
            </div>
          </div>
        </div>
          
         
        </div>

        {/*<div className="col-span-2 lg:col-span-1">
          <Button
            onClick={() => {
              navigate(`/dashboard/edit-bookRequest/${bookRequest._id}`);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="col-span-3 lg:col-span-2">
          <Button
            alt
            onClick={() => {
              setShowModal(true);
              // alert(userName + " with Id " + userId + " deleted");
            }}
          >
            Delete
          </Button>
          </div>*/}
      </div>
      <Backdrop
        title="Delete User!"
        show={showModal}
        onClick={() => setShowModal(false)}
      >
        Are you sure you want to delete the book request?
        <div className="self-end mt-4">
          <Button
            type={"button"}
            onClick={async () => {
              await bookRequestService.deleteBookRequest(bookRequest._id);
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

export default BooksRequestsItems;
