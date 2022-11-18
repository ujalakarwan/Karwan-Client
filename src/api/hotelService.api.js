import API from "./baseURL";

const addHotel = async (formData) => {
  try {
    const { data } = await API.post("/add-hotel", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateHotel = async (id, formData) => {
  try {
    const res = await API.patch(`/update-hotel/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/delete-hotel/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  addHotel,
  updateHotel,
  deleteProduct,
};

export default productService;
