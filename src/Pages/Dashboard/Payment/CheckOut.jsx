import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const CheckOut = () => {
    // eslint-disable-next-line
    const { user } = useAuth();
    const loadedData = useLoaderData()
    const salary = loadedData.salary;
    const [error, setError] =useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [paySuccess, setPaySuccess] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price: salary})
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
        })
    }, [axiosSecure, salary])

    const handleSubmit = async event => {
        event.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);

        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('payment error', error);
            setError(error.message)
        }
        else{
            console.log('payment method', paymentMethod);
            setError('')
            // setPaySuccess(paymentMethod.id)
        }

        // confirm payment
        const { paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: loadedData.email || 'anonymous',
                    name: loadedData.name || 'anonymous'
                }
            }
        })

        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id);
                setPaySuccess(paymentIntent.id)
            }
        }
    }

    return (
        <div>
            {/* <h1 className="text-5xl">Employees Salary : {loadedData.salary}</h1> */}
            <form onSubmit={handleSubmit}>
            <CardElement
            className="m-4"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary m-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay ${loadedData.salary}
            </button>
            <p className="text-red-600 m-10">
                {error}
            </p>
            {
                paySuccess && <p className="text-green-600 m-4">Your Transaction ID: {paySuccess}</p>
            }
        </form>
        </div>
    );
};

export default CheckOut;