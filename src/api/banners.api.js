import API from "./baseURL";

const addBanner = async (formData) => {
  try {
    const { data } = await API.post("/add-banner", formData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateBanner = async (id, formData) => {
  try {
    const res = await API.patch(`/update-banner/${id}`, formData);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const deleteBanner = async (id) => {
  try {
    const res = await API.delete(`/delete-banner/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const bannerService = {
  addBanner,
  updateBanner,
  deleteBanner,
};

export default bannerService;
