import { API } from "../Utils/Axiosinstance";

export async function signup(body) {
  try {
    const result = await API.post("/auth/signup", body);
    return result?.data;
  } catch (error) {
    console.log(error);
    return { msg: error.response?.data, error: error.response?.status };
  }
}

export async function signin(body) {
  try {
    const result = await API.post("/auth/signin", body);
    return result?.data;
  } catch (error) {
    console.log(error);
    return { msg: error.response?.data, error: error.response?.status };
  }
}

export async function verify(token){
  try {
    await API.post("/auth/checkLogin",{token})
    return true;
  } catch (error) {
    console.log(error);
    return false
  }
}
