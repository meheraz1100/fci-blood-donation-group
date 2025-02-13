import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://employ-ease2.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;