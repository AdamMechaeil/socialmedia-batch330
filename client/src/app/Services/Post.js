import { API } from "../Utils/Axiosinstance";

export async function createPost(body,authData){
    try {
        API.interceptors.request.use((req)=>{
            req.headers.authorization=`bearer ${authData.token}`
            return req;
        })
        console.log(body,authData);
        
        const result = await API.post("/posts/createPost",body)
        return result?.status;

    } catch (error) {
        console.log(error);
    }
}
