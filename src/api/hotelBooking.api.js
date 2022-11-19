import API from "./baseURL";

const addProductCart = async (formData) => {
  try {
    const { data } = await API.post("/add-hotelbooking", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProductCart = async (id, formData) => {
  try {
    const res = await API.patch(`/update-hotelbooking/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteProductCart = async (id) => {
  try {
    const res = await API.delete(`/delete-hotelbooking/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const productCartService = {
  addProductCart,
  updateProductCart,
  deleteProductCart,
};

export default productCartService;
