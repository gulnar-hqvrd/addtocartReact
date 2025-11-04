import axios from "axios";
const AxiosIstance=axios.create({
    baseURL:"http://localhost:3000/"
})


export const getApi= async(url)=>{
    return  await AxiosIstance.get(url)
}

export const postApi=async(url,payload)=>{
    return await AxiosIstance.post(url,payload)
}