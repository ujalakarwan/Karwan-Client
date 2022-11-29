import API from "./baseURL";

const addBook = async (formData) => {
  try {
    const { data } = await API.post("/add-transanction", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (id, formData) => {
  try {
    const res = await API.patch(`/update-transanction/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (id) => {
  try {
    const res = await API.delete(`/delete-transanction/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const bookService = {
  addBook,
  updateBook,
  deleteBook,
};

export default bookService;
