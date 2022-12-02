import API from "./baseURL";

const sendPdf = async (email,formData) => {
  try {
    const res = await API.post(`/generate-and-send-synopsis/${email}`, formData);
    return res;
  } catch (error) {
    console.log(error);
  }
};




const userService = {
  sendPdf
};

export default userService;
