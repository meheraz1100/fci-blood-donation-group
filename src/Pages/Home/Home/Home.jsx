import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>EmployEase | Home</title>
            </Helmet>
            <Banner></Banner>
            <Services></Services>
            <Hero></Hero>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;