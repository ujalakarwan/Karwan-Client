import API from "./baseURL";

const addProductCart = async (formData) => {
  console.log("formdata",formData)

  try {
    const { data } = await API.post("/add-holyplace", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProductCart = async (id, formData) => {
  try {
    const res = await API.patch(`/update-holyplace/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteProductCart = async (id) => {
  try {
    const res = await API.delete(`/delete-holyplace/${id}`);
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
