import { API } from "../Utils/Axiosinstance";

export async function verifyOTP(body) {
  try {
    const res = await API.post("/auth/verifyOtp", body);
    console.log(res);
    return res?.data;
} catch (error) {
    console.log(error);
    return { msg: error.response?.data, error: error.response?.status };
  }
}

export async function sendOTP(body) {
  try {
    const res=await API.post("/auth/resendOtp", body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
