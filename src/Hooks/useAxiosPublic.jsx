import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://fci-blood-donation-group.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;