import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Services from "../Services/Services";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>FCI BDG | Home</title>
            </Helmet>
            <Banner></Banner>
            <Services></Services>
            {/* <Hero></Hero> */}
        </div>
    );
};

export default Home;