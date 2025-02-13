import { loadStripe } from "@stripe/stripe-js";
import SectionHeading from "../../../Components/SectionHeading/SectionHeading";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";


//  TODO: ADD THE PUBLISHABLE KEY
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {

    return (
        <div>
            <SectionHeading
            heading="Payment"
            subHeading="Please Pay For Work"
            ></SectionHeading>
            <div>
                <Elements
                stripe={stripePromise}
                >
                    <CheckOut />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;