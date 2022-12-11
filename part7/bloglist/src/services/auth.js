import axios from "axios"

const loginUser = (loginInfo)=>{
    const request = axios.post("/auth/login", loginInfo);

    return request;
} 


export {loginUser};