

"use client"

import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import React,{ useState, useEffect } from "react";

export default function CheckoutForm( {amount} ) { 

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    // useEffect(() => {

    //     fetch("/api/create-payment-intent", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ amount: (Math.round(amount * 100)) }),
    //       })
    //         .then((res) => res.json())
            
    //         .then((data) => {

    //         console.log("Client Secret  :   ", data.clientSecret);

    //         setClientSecret(data.clientSecret);
    //     })
    //     }, [amount]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
          }
          setIsLoading(true);
      
          const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
              return_url: `http://localhost:3002/`,
            },
          });
      
          if (error) {
            console.log("I am the error when comfirmPayment       ",error);
            setErrorMessage(error.message);
          } else {
            setErrorMessage("Done");
          }
      
          setIsLoading(false);

    }

    // if (!clientSecret || !stripe || !elements) {
    //     return (
    //       <div className="flex items-center justify-center">
    //         <div
    //           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
    //           role="status"
    //         >
    //           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //             Loading...
    //           </span>
    //         </div>
    //       </div>
    //     );
    //   }

    return(
        <form onSubmit={handleSubmit}  className="bg-white p-2 rounded-md">
            
            {/* {clientSecret && <PaymentElement /> } */}

            <PaymentElement />

            {/* { errorMessage && <div> {errorMessage} </div> } */}

            <button
                disabled={!stripe || isLoading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!isLoading ? `Pay $${amount}` : "Processing..."}
            </button>
        </form>

    )
}












