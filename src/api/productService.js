import API from "./baseURL";

const addProduct = async (formData) => {
  try {
    const { data } = await API.post("/add-product", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (id, formData) => {
  try {
    const res = await API.patch(`/update-product/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const res = await API.delete(`/delete-product/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  addProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
